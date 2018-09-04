import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-pie',
    templateUrl: './pie.component.html',
    styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
    @Input()
    text: string;
    @Input()
    subtext: string;
    @Input()
    tooltipFormatter: string;
    @Input()
    series: Array<PieSeries>;

    chartOption: any;

    constructor() { }

    ngOnInit(): void {
      this.initChartOption();
    }

    initChartOption() {
        this.chartOption = {};
        this.initTitle();
        this.initTooltip();
        this.initLegend();
        this.initSeries();
    }

    /**
     * 初始化标题
     */
    initTitle() {
        this.chartOption['title'] = {
            text: this.text,
            subtext: this.subtext ? this.subtext : '',
            x: 'center'
        };
    }

    /**
     * 初始化提示框组件
     */
    initTooltip() {
        this.chartOption['tooltip'] = {
            trigger: 'item',
            formatter: this.tooltipFormat.bind(this)
        };
    }

    /**
     * 初始化图例组件
     */
    initLegend() {
        let legendData: Array<string> = [];
        for (let i = 0; i < this.series.length; i++) {
            for (let j = 0; j < this.series[i].data.length; j++) {
                legendData.push(this.series[i].data[j].name);
            }
        }
        this.chartOption['legend'] = {
            orient: 'vertical',
            left: 'left',
            data: legendData
        };
    }

    /**
     * 初始化数据
     */
    initSeries() {
        this.chartOption['series'] = [];
        let num = this.series.length;
        for (let i = 0; i < this.series.length; i++) {
            let item = {
                name: this.series[i].name,
                type: 'pie',
                radius : this.series[i].radius,
                center: ['50%', '60%'],
                data: this.series[i].data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
            // 自定义 label
            if (this.series[i].labelFormatter) {
                item = this.labelFormat(item, this.series[i].labelFormatter, this.series[i].labelData);
            }
            // 玫瑰图
            if (this.series[i].roseType) {
                item['roseType'] = this.series[i].roseType;
            }
            // 出现多圆环饼图
            if (i < this.series.length - 1) {
               item = this.nestedPie(item);
            }
            this.chartOption['series'].push(item);
        }
    }

    /**
     * 嵌套环里面要设置为inner
     *
     * @param item 嵌套环数据
     */
    nestedPie(item) {
        item['label'] = {
            normal: {
                position: 'inner'
            }
        };
        item['labelLine'] =  {
            normal: {
                show: false
            }
        };

        return item;
    }

    /**
     * 提示框自定义
     *
     * @param params
     */
    tooltipFormat(params) {
        if (!this.tooltipFormatter) {
            return `${params.seriesName} <br/> ${params.data.name} : ${params.data.value} (${params.percent}%)`;
        }
    }


    /**
     * label 自定义
     *
     * @param labelFormatter
     */
    labelFormat(item, labelFormatter, labelData?) {
        if (labelFormatter === 'normal') {
            item['label'] =  {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            };
        }

        return item;
    }

}

/**
 * 表单信息
 */
export interface PieSeries {
    name: string;
    radius: string;
    data: Array<any>;
    labelData?: any;
    labelFormatter?: string; // 自定义label
    roseType?: string; // 玫瑰图: radius
}
