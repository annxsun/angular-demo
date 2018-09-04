import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserItem } from '../myhttp.model';
import { MyHttpService } from '../myhttp.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl } from '@angular/material';
import { LoadingService } from '../../../shared/loading/loading.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    // name
    private nameKey  = '';
    // 名称查询
    private searchTerms = new Subject<string>();
    // 列表字段
    private displayedColumns: String[];
    // 列表数据
    private dataSource: MatTableDataSource<UserItem>;
    // 分页
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // 排序
    @ViewChild(MatSort) sort: MatSort;

    constructor(private service: MyHttpService,
    private matPaginatorIntl: MatPaginatorIntl,
    private router: Router,
    private loading: LoadingService) { }

    ngOnInit() {
        this.getDataSource();
        this.searchByNameSubject();
        this.initMatPaginatorIntl();
    }

    /** 首次初始化数据 */
    getDataSource() {
        this.loading.start();
        this.displayedColumns = ['name', 'birth', 'email', 'role', 'hobby', 'option'];
        this.service.searchUsers(this.nameKey).subscribe(users => {
            this.dataSource = new MatTableDataSource<UserItem>(users);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.loading.stop();
        });
    }

    /**
     * 根据名称模糊搜索
     *
     * @param filterValue 名称关键字
     */
    searchByName(filterValue: string) {
        this.nameKey = filterValue;
        this.searchTerms.next(filterValue);
    }

    /**
     * 根据名称模糊搜索
     */
    searchByNameSubject() {
        this.searchTerms.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((term: string) => {
                this.loading.start();
                return this.service.searchUsers(term);
            }),
        )
        .subscribe(users => {
            this.loading.stop();
            this.dataSource = new MatTableDataSource<UserItem>(users);
        });
    }

    initMatPaginatorIntl() {
        this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
            if (length === 0 || pageSize === 0) {
                return `共 0 条信息`;
            }

            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

            return `第 ${startIndex + 1} - ${endIndex} 条信息  /  共 ${length} 条信息`;
        };

        this.matPaginatorIntl.itemsPerPageLabel = '每页页数：';
        this.matPaginatorIntl.nextPageLabel = '下一页';
        this.matPaginatorIntl.previousPageLabel = '上一页';
        this.matPaginatorIntl.firstPageLabel = '首页';
        this.matPaginatorIntl.lastPageLabel = '尾页';
    }

    delete(id) {
        this.loading.start();
        this.service.delete(id).subscribe(data => {
            this.loading.stop();
            this.getDataSource();
        });
    }

    creat() {
        this.router.navigate(['./http/list/create']);
    }

    detail(id) {
        this.router.navigate(['./http/list/create', {id: id}]);
    }
}
