import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../../../../models/match.model';
import {
  ParticipantDb,
  ParticipantService,
} from '../../../../services/participant.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tournament-detail-participants',
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './tournament-detail-participants.component.html',
  styleUrl: './tournament-detail-participants.component.css',
})
export class TournamentDetailParticipantsComponent implements OnInit {
  @Input() tournament: any;
  @Input() participants!: Participant[];

  // @Input() participantsDb!: ParticipantDb[];
  // filteredParticipants: ParticipantDb[];
  isLoading: boolean = false;

  expandedIndex: number | null = null;

  selectedCategory = 'D';
  categoriesList = ['D', 'E'];

  imagesList = {};

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.filterParticipants();
    this.imagesList = {
      '16435768': {
        'Bassem Makki & Ali Yaman':
          'https://drive.google.com/drive/folders/1zGXiyHyEInwyorBTYKnDXyjSM9LcbtPh',
        'Rami & Ibrahim':
          'https://drive.google.com/drive/folders/1MAo3WcvYyoQpMxM5P-TscR8giB5HIK1Q',
        'Tarek & Dandashli':
          'https://drive.google.com/drive/folders/1z3IlPbM-oaU3X3733xgLJJbBzdcXODlt',
        'Adam safadieh & Ali ahmad':
          'https://drive.google.com/drive/folders/1EGOWGDP0PLFkBPdW13NI1XT4WjFWEZ-V',
        'Maxim Aoun & Jawad Al Hajj':
          'https://drive.google.com/drive/folders/17EKgYabRZN38E279g1y3raYtkV987Kmo',
        'mhmd abulaynin & Partner':
          'https://drive.google.com/drive/folders/19NvemG49HLptc7-LdOnZgJSaPKzzTayi',
        'Alaa totanji & Karim bahlawan':
          'https://drive.google.com/drive/folders/1dIfLmiFCWsV3PqxRwUjdPD9QIVGdyHfr',
        'Raed Bsat & Ahmad Kayello':
          'https://drive.google.com/drive/folders/1MHkfIVvOco8od8TjbefS8aPgm6bFqkQl',
        'Mhmd Abedlhameed & Omar naffaa': '',
        'Brahim mkari & Mhmd ahmad':
          'https://drive.google.com/drive/folders/1tZd2RYoN62JlbWNJxLatiqSGHdiN8Qwl',
        'Kayed Miari & Firas Darwich':
          'https://drive.google.com/drive/folders/1B0tdnSPNby3PH44MiZxBYJjEcfPyLq4D',
        'Jubaili & Omar':
          'https://drive.google.com/drive/folders/16Iulp0j8SWbp_7ax0qqgBqAwxPEvPLma',
        'Ahmad akra & Bassem abdel jawad':
          'https://drive.google.com/drive/folders/1C-cguOCecCgeOHzhOK1lQ2wXlK_T8ca-',
        'Abedelhaleem Dimassi & Omar antar':
          'https://drive.google.com/drive/folders/1r4VFRXUQWzGY65ZUxAdBu8Gss0arqwtp',
        'Rayan makki & Fahed':
          'https://drive.google.com/drive/folders/1wKwIqLpe1Y5dlL_1yj2RfXwyGF0LDDMM',
        'Ahmad Farhat & Karim Farhat':
          'https://drive.google.com/drive/folders/1dGXMK7deHga59WJbbIjyBkhZKWII5Clv',
      },
      '16435836': {
        'Ali hajj & Abbas hajj':
          'https://drive.google.com/drive/folders/1vlV7X1NW-E48kboxJhi5FD8u6IEQCGRC',
        'Ayman saoudi & Mhmd hashisho':
          'https://drive.google.com/drive/folders/1r-9hZ_9PfPir9tomsI-0_yWnsFx6-t7B',
        'ghadi & kareem':
          'https://drive.google.com/drive/folders/1T3sUMU4hXPdz6-qIQig669WQv9gpnIjP',
        'Mohammad Shehade & Mohammad Jradi':
          'https://drive.google.com/drive/folders/126fczGC7MsEddk3pEWnz4ywR-cyI2ZXj',
        'Fadel & Ali Abdallah':
          'https://drive.google.com/drive/folders/1DyCV9ubayfUbvI-PtfdGe5OHI7VhZBwk',
        'Afif moati & Malek akkad':
          'https://drive.google.com/drive/folders/1wiAaSFLSEa-MDSxdzgmbLdZJXkAeR35P',
        'Raed Miari & Rayyan bawab':
          'https://drive.google.com/drive/folders/1aUmy9FK5c2to30m2KCEbfJtWbJYmJ5Qo',
        'Bassem Baba & Younis abo aynin':
          'https://drive.google.com/drive/folders/1qGzRFhfURcVPPBPR_Q9DyEBnWAEi7Y3z',
        'Manal Barakat & Samer':
          'https://drive.google.com/drive/folders/1zXFGyvA9Wa8y0xkKyYjqGbc7gWyZgg6r',
        'Donia Merie & Imad El Sayad':
          'https://drive.google.com/drive/folders/17QYvh1uo2NIiAiaPnd5wWpUA8iMmIEnM',
        'Hassouna & Hasan Arnaout':
          'https://drive.google.com/drive/folders/101bHtK1nX1eYl-XvCfa31qmvMsdfmIAN',
        'Kamel Kahwaji & Mustafa Kahwaji':
          'https://drive.google.com/drive/folders/1XygdMI9BT3JuKG1tysrNjfwLqA7HGHbU',
        'Karim Al yaman & Mihidine abo zaher':
          'https://drive.google.com/drive/folders/12xSDc0i1K0SmiVN6WZ80SSou9tKN98co',
        'Adam & Hassan Dalal':
          'https://drive.google.com/drive/folders/1dLrRLwL3OwjfD5uTSH98WWC8dv3KVHr9',
        'Zouheir Younes & Kareem hamdan':
          'https://drive.google.com/drive/folders/1vZaFiQW6CGaAFBF4ey2q16IrL_0SjBiG',
        'Abedalhameed AL Makdah & Amira EL Dirani':
          'https://drive.google.com/drive/folders/1uRkfZQSs4ODSw6WeNln9_OOMskEnG6lR',
      },
    };
  }

  filterParticipants(): void {
    // this.filteredParticipants = this.participants.filter((p) => {
    //   return p.category === this.selectedCategory;
    // });
  }

  navigateToImages(p: Participant) {
    if (this.imagesList[this.tournament.id]) {
      if (this.imagesList[this.tournament.id][p.name] === '') {
        this.snackBar.open(`No images found for ${p.name}`, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-warning'],
        });
      } else {
        const image = this.imagesList[this.tournament.id][p.name];
        window.open(image);
      }
    }
  }
}
