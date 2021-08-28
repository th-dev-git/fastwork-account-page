import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'account-page';
  headerColumnValues: HeaderCell[][] = [
    [
      { value: 'acctNo', name: 'ลำดับที่', rowspan: 4 },
      // { value: 'flags', name: 'สถานะ', rowspan: 4 },
      // { value: 'productTypeDesc', name: 'รายการ', rowspan: 4 },
      // { value: 'acctStatus', name: 'DLC', rowspan: 4 },
      // { value: 'bookBranchDesc', name: 'เวลาทำรายการ', rowspan: 4 },
      { value: 'limitAmount', name: 'ยอดรวม', colspan: 12 },
      // { value: 'acctName', name: 'ผู้ทำรายการ', rowspan: 4 },
      // { value: 'limitAmounts', name: 'ช่องทางทำรายการ', rowspan: 4 },
      // { value: 'acctStatuss', name: 'จำนวนเงิน', rowspan: 4 },
      // { value: 'bookBranchDescs', name: 'Payment', rowspan: 4 },
      // { value: 'ocDescs', name: 'Description', rowspan: 4 },
    ],
    [
      { value: 'openDate', name: 'วันที่ทำรายการ', colspan: 6 },
      { value: 'closeDate', name: 'วันที่มีผล', colspan: 6 },
    ],
    [
      { value: 'amount1', name: 'จำนวนเงิน', rowspan: 2 },
      { value: 'grandTotal1', name: 'ผลรวมทั้งหมด', rowspan: 2 },
      { value: 'installment1', name: 'งวด', colspan: 4 },
      { value: 'amount2', name: 'จำนวนเงิน', rowspan: 2 },
      { value: 'grandTotal2', name: 'ผลรวมทั้งหมด', rowspan: 2 },
      { value: 'installment2', name: 'งวด', colspan: 4 },
    ],
    [
      { value: 'on1stTime1', name: 'ครั้งที่1' },
      { value: 'on2ndTime1', name: 'ครั้งที่2' },
      { value: 'on3rdTime1', name: 'ครั้งที่3' },
      { value: 'on4thTime1', name: 'ครั้งที่4' },
      { value: 'on1stTime2', name: 'ครั้งที่1' },
      { value: 'on2ndTime2', name: 'ครั้งที่2' },
      { value: 'on3rdTime2', name: 'ครั้งที่3' },
      { value: 'on4thTime2', name: 'ครั้งที่4' },
    ],
  ];
  displayedColumns: string[] = [];
  headerRows: any;
  modules = [];
  promiseAll = [];
  openTable = false;
  errMessage = '';
  itemPerPage = 1;
  rows: any;
  pageEvent: PageEvent | undefined;
  msg = '';
  maxDate: any;
  mockDatas: any;

  openShow = false;
  accountDetails = [
    {
      acctName: 'นายCFNAME',
      acctNo: '412334455666',
      acctStatus: '01',
      bookBranch: '0222',
      bookBranchDesc: '0222',
      closeDate: '1900-01-01',
      limitAmount: '690,000.00',
      ocCode: '3099',
      ocDesc: '3099',
      openDate: '2012-10-30',
      productType: 'LN35',
      productTypeDesc: 'LN35',
      amount1: 1,
      grandTotal1: 2,
      amount2: 7,
      grandTotal2: 8,
      on1stTime1: 3,
      on2ndTime1: 4,
      on3rdTime1: 5,
      on4thTime1: 6,
      on1stTime2: 9,
      on2ndTime2: 10,
      on3rdTime2: 11,
      on4thTime2: 12,
    },
  ];

  table2Header: HeaderCell[][] = [
    [
      { value: 'detail', name: ' ' },
      { value: 'sumMoney', name: 'เงินต้น' },
      { value: 'sumPrince', name: 'ดอกเบี้ย' },
      { value: 'sumTot', name: 'รวม' },
    ],
  ];
  convertedTable2Headers: string[] = [];
  convertedTable2HeaderRows: any;

  summary = [
    {
      detail: 'รายละเอียด',
      account: 'xxxx',
      sumMoney: '10,000',
      sumPrince: '100',
      sumTot: '11,000',
    },
  ];

  table3: TableObject = {
    name: 'info',
    headerData: [
      [
        { value: 'name', name: 'ชื่อ' },
        { value: 'regisNumber', name: 'เลขทะเบียน' },
        { value: 'status', name: 'สถานะ' },
        { value: 'detail', name: 'ข้อมูลเพิ่มเติม', colspan: 4, display: true },
      ],
    ],
    columns: [],
    headers: [],
    data: [
      {
        name: ['testName'],
        regisNumber: [1234],
        status: ['A'],
        detail: ['1', 'xxx', 'test1.1', 'test1.1'],
      },
      {
        name: [''],
        regisNumber: [''],
        status: [''],
        detail: ['2', 'yyy', 'test1.2', 'test1.2'],
      },
      {
        name: [''],
        regisNumber: [''],
        status: [''],
        detail: ['3', 'zzz', 'test1.3', 'test1.3'],
      },      
      {
        name: [''],
        regisNumber: [''],
        status: [''],
        detail: ['', '', '', ''],
      },
      {
        name: ['นายCFNAME'],
        regisNumber: [412333445888],
        status: ['F'],
        detail: ['1', 'aaa', 'test2.1', 'test2.1'],
      },
      {
        name: [''],
        regisNumber: [""],
        status: [''],
        detail: ['2', 'bbb', 'test2.2', 'test2.2'],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.headerRows = this.headerColumnValues.map((row) =>
      row.map((col) => col.value)
    );
    this.displayedColumns = this.getTableHeader(this.headerColumnValues);

    this.convertedTable2HeaderRows = this.table2Header.map((row) =>
      row.map((col) => col.value)
    );
    this.convertedTable2Headers = this.getTableHeader(this.table2Header);

    this.initTable(this.table3);
  }

  getTableHeader(header: HeaderCell[][]): string[] {
    const head: Header[][] = header.map((row: HeaderCell[], rowIndex) => {
      let sum = 0;
      return row.map((col: HeaderCell, colIndex) => {
        const rowspan = col.rowspan ? col.rowspan : 1;
        const colspan = col.colspan ? col.colspan : 1;
        col.colspan = colspan;
        col.rowspan = rowspan;
        col.index = colIndex;
        col.level = rowIndex;
        col.rowSeq = sum;

        const newCol: Header = {
          value: col.value,
          index: colIndex,
          level: rowIndex,
          rowSeq: col.rowSeq,
          colspan,
          rowspan,
        };
        sum += colspan;
        return newCol;
      });
    });

    const colSpanLevel: number[][] = head.map((h) =>
      new Array(head[0].reduce((acc, cur) => acc + cur.colspan, 0)).fill(0)
    );

    head.forEach((row) => {
      row.forEach((col) => {
        let colPos = colSpanLevel[col.level].indexOf(0);
        let silced = colSpanLevel[col.level].slice(0, colPos + 1);
        col.rowSeq = silced.reduce((acc, cur) => acc + cur, 0);
        for (let i = 0; i < col.rowspan; i++) {
          for (let j = 0; j < col.colspan; j++) {
            colSpanLevel[i + col.level][j + col.rowSeq] += 1;
          }
        }
      });
    });

    return head
      .map((row) => row.filter((col) => col.colspan == 1))
      .reduce((acc, cur) => acc.concat(cur))
      .sort((a, b) => a.rowSeq - b.rowSeq)
      .map((col) => col.value);
  }

  initTable(table: TableObject) {
    table.headers = table.headerData.map((row) => row.map((col) => col.value));
    table.columns = this.convertToColumns(table.headerData);
  }

  convertToColumns(data: HeaderCell[][]): string[] {
    const head: Header[][] = data.map((row: HeaderCell[], rowIndex) => {
      let sum = 0;
      return row.map((col: HeaderCell, colIndex) => {
        const rowspan = col.rowspan ? col.rowspan : 1;
        const colspan = col.colspan ? col.colspan : 1;
        col.colspan = colspan;
        col.rowspan = rowspan;
        col.display = col.display ? col.display : col.colspan === 1;
        col.index = colIndex;
        col.level = rowIndex;
        col.rowSeq = sum;

        const newCol: Header = {
          value: col.value,
          index: colIndex,
          level: rowIndex,
          rowSeq: col.rowSeq,
          colspan,
          rowspan,
          display: col.display,
        };
        sum += colspan;
        return newCol;
      });
    });

    const colSpanLevel: number[][] = head.map((h) =>
      new Array(head[0].reduce((acc, cur) => acc + cur.colspan, 0)).fill(0)
    );

    head.forEach((row) => {
      row.forEach((col) => {
        let colPos = colSpanLevel[col.level].indexOf(0);
        let silced = colSpanLevel[col.level].slice(0, colPos + 1);
        col.rowSeq = silced.reduce((acc, cur) => acc + cur, 0);
        for (let i = 0; i < col.rowspan; i++) {
          for (let j = 0; j < col.colspan; j++) {
            colSpanLevel[i + col.level][j + col.rowSeq] += 1;
          }
        }
      });
    });

    return head
      .map((row) => row.filter((col) => col.display))
      .reduce((acc, cur) => acc.concat(cur))
      .sort((a, b) => a.rowSeq - b.rowSeq)
      .map((col) => col.value);
  }

  isArray(obj: any): boolean {
    console.log(obj);
    return Array.isArray(obj);
  }
}

interface Header {
  value: string;
  rowspan: number;
  colspan: number;
  seq?: number;
  rowSeq: number;
  index: number;
  level: number;
  display?: boolean;
}

interface HeaderCell {
  value: string;
  name: string;
  rowspan?: number;
  colspan?: number;
  seq?: number; // sequence
  rowSeq?: number;
  index?: number;
  level?: number;
  display?: boolean;
}

interface TableObject {
  name: string;
  headerData: HeaderCell[][];
  data: any[];
  columns: string[];
  headers: string[][];
}
