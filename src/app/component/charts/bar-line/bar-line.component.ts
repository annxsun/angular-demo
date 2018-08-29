import { Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-bar-line',
    templateUrl: './bar-line.component.html',
    styleUrls: ['./bar-line.component.scss']
})
export class BarLineComponent implements OnInit {

    @Input()
    text: string; // 主标题
    @Input()
    subtext: string; // 副标题
    @Input()
    series: Array<BarSeries>; // 数据集合
    @Input()
    mainAxis: string; // xAxis: x 为主轴， yAxis: y 为主轴; 不传默认是 xAxis
    @Input()
    mainAxisData: Array<string>; // 主轴数据
    @Input()
    crossAxis: Array<CrossAxis>; // 副轴样式
    @Input()
    axisLabelFormatter: String; // 自定义label显示样式索引
    @Input()
    stack: string; // 堆叠显示
    @Input()
    type: string; // 同一样式; 不传默认是 bar
    @Input()
    smooth: boolean; // 折线是否平滑
    @Input()
    areaStyle: boolean; // 分隔区域颜色
    @Input()
    boundaryGap: string; // 是否留白策略
    @Input()
    toolbox: string;
    @Input()
    zoomConfig: any;

    // 超出 50 条数据就要显示 dataZoom 进度条
    ZOOM_NUM = 50;

    chartOption: any;

    constructor() { }

    ngOnInit(): void {
        this.initChartOption();
     }

    initChartOption() {
        this.chartOption = {};
        this.initTitle();
        this.initLegend();
        this.initTooltip();
        this.initGrid();
        this.initAxis();
        this.axisLabelFormat();
        this.dataZoom();
        this.initSeries();
        this.initToolbox();
        console.log("this.chartOption", this.chartOption);
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
     * 初始化图例组件
     */
    initLegend() {
        if (this.mainAxis === 'yAxis') {
            return;
        }
        this.chartOption['legend'] = {
            orient: 'vertical',
            left: 'left',
        };
    }

    /**
     * 初始化工具箱
     */
    initToolbox() {
        if (this.toolbox === '1') {
            this.chartOption['toolbox'] = {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            };
        }
    }

    /**
     * 初始化提示框组件
     */
    initTooltip() {
        this.chartOption['tooltip'] = {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        };

        if (this.type === 'line') {
            this.chartOption['tooltip']['axisPointer'] = {
                type : 'cross'
            };
        }
    }

    /**
     * 初始化图形位置
     */
    initGrid() {
        this.chartOption['grid'] = {
            top: '25%',
            left: '1%',
            right: '10%',
            containLabel: true
        };
    }

    /**
     * 初始化坐标轴
     */
    initAxis() {
        let main = this.initMainAxis();
        let across = this.initCrossAxis();
        this.chartOption['yAxis'] = this.mainAxis === 'yAxis' ? main : across;
        this.chartOption['xAxis'] = this.mainAxis === 'yAxis' ? across : main;
    }

    /**
     * 初始化主轴信息
     */
    initMainAxis() {
        return {
                    type : 'category',
                    data : this.mainAxisData,
                    boundaryGap: (this.boundaryGap === undefined || this.boundaryGap === 'true') ? true : false,
                    axisTick: {
                        alignWithLabel: true
                    }
                };
    }

    /**
     * 初始化副轴信息
     */
    initCrossAxis() {
      // 不设置副轴属性
      if (!this.crossAxis) {
          return {};
      }
      // 设置副轴属性
      let across = [];
      if (this.crossAxis.length > 0) {
        for (let i = 0; i < this.crossAxis.length; i++) {
            let item = {
                name: this.crossAxis[i].name ? this.crossAxis[i].name : '',
                inverse: this.crossAxis[i].inverse === true ? true : false,
                nameLocation:  this.crossAxis[i].inverse === true ? 'start' : 'end',
            };
            across.push(item);
        }
      }
      // 只有一个副轴
      if (across.length === 1) {
          return across[0];
      }
      // 多个副轴
      return across;
    }

    /**
     * 初始化数据
     */
    initSeries() {
        this.chartOption['series'] = [];
        for (let i = 0; i < this.series.length; i++) {
            let item = {
                name: this.series[i].name,
                type: this.type === 'line' ? 'line' : 'bar',
                data: this.series[i].data,
                stack: this.stack ? this.stack : null,
                // label: {
                //     normal: {
                //         show: true,
                //         textBorderColor: '#333',
                //         textBorderWidth: 2
                //     }
                // }
            };
            if (this.smooth) {
                item['smooth'] = true;
            }
            if (this.areaStyle) {
                item['areaStyle'] = {normal: {}};
            }
            if (this.series[i].yAxisIndex && this.crossAxis && this.crossAxis.length > 1) {
                item['yAxisIndex'] = this.series[i].yAxisIndex;
            }
            if (this.series[i].type) {
                item['type'] = this.series[i].type;
            }

            this.chartOption['series'].push(item);
        }
    }

    /**
     * 放大缩小
     */
    dataZoom() {
        if (this.mainAxis !== 'yAxis' && this.mainAxisData.length > this.ZOOM_NUM) {
            let start = 60 + Math.round(this.mainAxisData.length / this.ZOOM_NUM) * 10;
            this.chartOption['dataZoom'] = [
                {
                    show: true,
                    start: start > 96 ? 96 : Math.floor(start),
                    end: 100,
                }
            ];

        }
    }

    /**
     * 自定义悬浮提示框
     */
    axisLabelFormat() {
        // let acrossAxis = this.mainAxis === 'yAxis' ? 'xAxis' : 'yAxis';
        // if (this.axisLabelFormatter === '') {
        //     this.chartOption[acrossAxis]['axisLabel'] = {
        //         formatter: function (a) {
        //             return '';
        //         }
        //     };
        // }
    }


}

/**
 * 表单信息
 */
export interface BarSeries {
    name: string;
    data: Array<any>;
    type?: string;
    markPoint?: string;
    yAxisIndex?: Array<any>| number|string;
    xAxisIndex?: Array<any>| number|string;
}

export interface CrossAxis {
    name?: string;
    nameLocation?: string;
    type?: string;
    max?: number;
    inverse?: boolean;
}
