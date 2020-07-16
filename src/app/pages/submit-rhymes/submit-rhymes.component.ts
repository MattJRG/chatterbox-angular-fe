import { Component, OnInit } from '@angular/core';
import { ConnectorService } from './../../services/connector.service';

@Component({
  selector: 'app-submit-rhymes',
  templateUrl: './submit-rhymes.component.html',
  styleUrls: ['./submit-rhymes.component.scss']
})
export class SubmitRhymesComponent implements OnInit {
  word: string;
  words = [];
  rhymeArray2 = [
    {
    id: 1,
    list: ['pipe', 'blype', 'clype', 'cripe', 'd-type', 'flipe', 'flype', 'gipe', 'gripe', 'grype', 'heiap', 'hype', 'knipe', 'lipe', 'p-type', 'quipe', 'r.i.p', 'ripe', 'shipe', 'sipe', 'skype', 'slipe', 'slype', 'snipe', 'stipe', 'stripe', 'stype', 'swipe', 'syp', 'tripe', 'type', 'wipe']
    },
    {
      id: 2,
      list: ['head', 'bled', 'bread', 'bred', 'chsld', 'cread', 'dead', 'dread', 'dred', 'dredd', 'ed', 'fed', 'fleadh', 'fled', 'fread', 'fred', 'freda', 'ged', 'head', 'jed', 'lead', 'led', 'lvedp', 'med', 'ned', 'nedd', 'pled', 'read', 'reade', 'red', 'redd', 'redde', 'said', 'shead', 'shed', 'shedd', 'shred', 'sled', 'sledd', 'spead', 'sped', 'spread', 'stead', 'ted', 'thread', 'tread', 'wed', 'wedd', 'zed']
    },
    {
      id: 3,
      list: ['round', 'bound', 'browned', 'clowned', 'crowned', 'downed', 'drowned', 'found', 'frowned', 'gowned', 'ground', 'hound', 'mound', 'pound', 'stound', 'wound']
    }
  ];

  constructor(private connectorService: ConnectorService) { }

  ngOnInit() {
    console.log(this.words.length)
  }

  addWords() {
    this.words = this.word.toString().replace(/[^a-zA-Z,\\s$]/g, '').replace(/[^a-zA-Z\\s$]/g, ' ').split(' ');
  }

  submitRhymes(rhymesData) {
    this.connectorService.postRhymes(rhymesData).subscribe(response => {
      console.log('response')
    })
  }

  sendRhyme(url: string, rhyme: { content: Array<string> }) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(rhyme),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json()).then(createdRhyme => {
      console.log(createdRhyme);
    });
  }

  onSubmit() {
    let rhyme = {
      rhymes: this.words
    };
    console.log(rhyme);
    this.submitRhymes(rhyme);
    this.word = '';
    this.words = [];
  }
}
