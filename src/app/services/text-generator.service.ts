import { Injectable } from '@angular/core';
import * as germanWords from '../../assets/german-words.json';
import { BehaviorSubject } from 'rxjs';
import { BookInputDTO } from '../DTOs/BookInputDTO';
import { BookService } from './book.service';
import { BookOutputDTO } from '../DTOs/BookOutputDTO';

@Injectable({
  providedIn: 'root'
})
export class TextGeneratorService {

  TIME_BETWEEN_LETTERS: number = 10;
  dict: string[] = (germanWords as any).default;
  runningServices = 0;

  constructor(private bookService: BookService) { }

  async write(){
    var book = "";
    var currentSentence = "";
    var currentWord = "";
    var wordLength = 0;

    if(this.runningServices >= 200){
      return;
    }

    this.runningServices++;
    console.log(this.runningServices, "running services");

    while(true){
      var word = await this.randomWord();
      if(this.dict.includes(word)){
        book += word + " ";
        wordLength++;
      }
      else if(wordLength != 0){
        //send book
        console.log("book: ", book);
        if(wordLength >= 2){
          this.uploadBook(book, wordLength);
        }
        book = "";
        wordLength = 0;
      }

      currentSentence += word;
      currentSentence += " ";
      currentWord = "";
    }
  }

  async randomWord(): Promise<string>{
    var chanceToCancel = 0;
    var x = 0;
    var word = "";

    do{
      x++;
      word += await this.randomLetter();
      chanceToCancel = 0.15;// this.enhancedSigmoid(x);
    }while(chanceToCancel < Math.random());

    return word;
  }

  async randomLetter(): Promise<string>{
    const options = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
    const optionsLength = options.length;
    await this.delay(this.TIME_BETWEEN_LETTERS);
    return options.charAt(Math.floor(Math.random() * optionsLength));
  }

  enhancedSigmoid(x: number): number{
    return 1 / (1 + Math.pow(Math.E, (x - 5) * (-1)));
  }

  linearFunc(x: number): number{
    return x / 30;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async uploadBook(content: string, wordLength: number){
    const bookInputDto: BookInputDTO = {content: content, numberOfWords: wordLength}
    
    this.bookService.uploadBook(bookInputDto).subscribe({
      next: (response: BookOutputDTO) => {
        console.log('Successfully uploaded book', response);
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}
