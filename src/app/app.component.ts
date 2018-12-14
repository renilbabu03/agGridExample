import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, IDatasource, IGetRowsParams, GridApi } from 'ag-grid-community';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agGridExamples';
  gridApi: GridApi;

  columnDefs = [
    {
      headerName: "Name",
      field: "athlete"
    },
    {
      headerName: "Status",
      field: "age"
    },
    {
      headerName: "Country",
      field: "country"
    }
  ];


  gridOptions: GridOptions = {
    pagination: true,
    rowModelType: 'infinite',
    cacheBlockSize: 20,
    paginationPageSize: 20
  };




  
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      this.apiService().subscribe(data => {
        params.successCallback(
          [data],
          101
        );
      })
    }
  }


  constructor(private httpclient: HttpClient) {
  }


  /**
   * This is where you call your server,
   * you can pass your start page and end page
   */
  apiService() {
    return this.httpclient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json')
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.setDatasource(this.dataSource)
  }

}




