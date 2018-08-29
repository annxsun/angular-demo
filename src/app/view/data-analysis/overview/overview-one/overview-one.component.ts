import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-overview-one',
    templateUrl: './overview-one.component.html',
    styleUrls: ['./overview-one.component.scss']
})
export class OverviewOneComponent implements OnInit {
    series1 = [{
        name: '访问来源',
        radius: '55%',
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
        ]
    }];

    series2 = [{
        name: '访问来源',
        radius: '55%',
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 548, name: '搜索引擎'}
        ],
        roseType : 'radius',
    }];

    series4 = [{
        name: '访问来源',
        radius: ['40%', '60%'],
        data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 548, name: '搜索引擎'}
        ],
    }];


    series3 = [{
            name: '访问来源',
            radius: [0, '30%'],
            data: [
                {value: 335, name: '直达', selected: true},
                {value: 679, name: '营销广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        },
        {
            name: '访问来源2',
            radius: ['40%', '55%'],
            data: [
                {value: 135, name: '视频广告'},
                {value: 1048, name: '百度'},
                {value: 251, name: '谷歌'},
                {value: 147, name: '必应'},
                {value: 102, name: '其他'}
            ],
            // labelFormatter: 'normal'
        },
    ];

    mainAxisDataBar1 = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    seriesBar1 = [
        {
            name: '2011年 ',
            data: [10, 52, 200, 334, 390, 330, 220, 1000, 10, 100, 200, 5]
        },
        {
            name: '2012年',
            yAxisIndex: 1,
            data: [10, 52, 20, 334, 30, 330, 420, 600, 80, 500, 100, 100]
        }
    ];
    seriesBar2 = [
        {
            name: '2011年',
            data: [10, 52, 200, 334, 390, 330, 220, 1000, 10, 100, 200, 5]
        },
        {
            name: '2012年',
            yAxisIndex: 1,
            data: [10, 52, 20, 334, 30, 330, 420, 600, 80, 500, 100, 100]
        }
    ];
    seriesBar3 = [
        {
            name: '2011年',
            type: 'bar',
            data: [10, 52, 200, 334, 390, 330, 220, 1000, 10, 100, 200, 5]
        },
        {
            name: '2012年',
            type: 'line',
            data: [10, 52, 20, 334, 30, 330, 420, 600, 80, 500, 100, 100]
        }
    ];
    axis = [
        {
            name: '预算 (百万)'
        },
        {
            name: '预算 (千万)',
            inverse: true
        }
    ];

    constructor() { }

    ngOnInit(): void { }
}
