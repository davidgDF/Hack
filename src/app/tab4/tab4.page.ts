import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFacturasPage } from '../modal-facturas/modal-facturas.page';
import { ModalVentasPage } from '../modal-ventas/modal-ventas.page';
import * as moment from 'moment';
import { HackSerivce } from '../services/hack.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  period:any;
  expenses:any;

  constructor(private modal: ModalController, private service: HackSerivce) { 
    this.loadData();
  }

  async loadData() {
    this.period = await this.service.getPeriodSales("2019-01-01");
    this.expenses = await this.service.getExpenses("2019-01-01");
  }

  async openModalFact() {
    const myModal = await this.modal.create(
     {
      component: ModalFacturasPage,
      componentProps: this.modal
     }
    );
    myModal.present();
  }

  async openModalVenta() {
    const mymodal = await this.modal.create(
      {
       component: ModalVentasPage,
       componentProps: this.modal
      }
     );
    mymodal.present();
  }

  async change(event){
    let date = '';
    switch(event.detail.value){
      case "0":
        date = "2019-01-01";
        break;
      case "1":
        date = "2018-01-01";
        break;
      case "2":
        date = "2017-01-01";
        break;
    }
    console.log(date);
    this.period = await this.service.getPeriodSales(date);
    this.expenses = await this.service.getExpenses(date);
  }
}
