import { Injectable } from '@angular/core';
import * as germanWords from '../../assets/german-words.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextGeneratorService {

  TIME_BETWEEN_LETTERS: number = 10;
  dict: string[] = (germanWords as any).default;
  runningServices = 0;

  constructor() { }

  async write(){
    var book = "";
    var currentSentence = "";
    var currentWord = "";

    this.runningServices++;
    console.log(this.runningServices, "running services");

    while(true){
      var word = await this.randomWord();
      if(this.dict.includes(word)){
        book += word + " ";
      }
      else if(book != ""){
        //send book
        console.log("book: ", book);
        book = "";
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
      chanceToCancel = this.enhancedSigmoid(x);
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
