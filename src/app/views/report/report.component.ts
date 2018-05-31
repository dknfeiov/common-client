import { deepExtend } from './../../common/COMMON';
import { ReportService } from './report.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import 'echarts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit, AfterViewInit {

  @ViewChild('chartContainer') chartContainer: ElementRef;
  chartInstance;  // 图表对象
  baseOption;  // 图表基础配置

  tagList;
  chartTypes;
  docList;

  // 已选中标签
  tags = [];
  // 图表类型
  chartType;
  // 图表数据
  chartData;

  constructor(
    private service: ReportService
  ) { }

  search() {

  }

  // 图表刷新
  chartChanges() {
    if (!this.tags || this.tags.length === 0) {
      return false;
    }
    this.chartData = this.tags.map(item => ({
      key: item.value,
      name: item.name,
      count: 0
    }));
    // 解析文档 标签
    this.docList.forEach(doc => {
      if (doc.tags) {
        doc.tags.split(',').forEach(tag => {
          const item = this.chartData.find(i => i.key === tag);
          if (item) {
            item.count++;
          }
        });
      }
    });
    const option = deepExtend({}, this.baseOption);
    const maxBoundary = Math.max(this.chartData.map(item => item.count));
    option.legend.data = '标签组合';
    option.radar.indicator = this.chartData.map(item => ({
      name: item.name,
      max: maxBoundary
    }));
    option.series = [{
      type: 'radar',
      data: [{
        value: this.chartData.map(item => item.count),
        name: '相关文档'
      }]
    }];
    // 使用刚指定的配置项和数据显示图表。
    this.chartInstance.setOption(option, true);
    this.chartInstance.resize();
  }


  ngOnInit() {
    this.chartTypes = this.service.getChartTypes();
    this.service.tagList().subscribe(res => {
      this.tagList = res.data.list.map(item => {
        return {
          value: item._id,
          name: item.name
        };
      });
    });
    // 获取文档列表
    this.service.docList({}).subscribe(res => {
      this.docList = res.data.list;
    });
  }


  ngAfterViewInit(): void {
    // 图表基础配置
    this.baseOption = this.service.getBaseOption();
    // 基于准备好的dom，初始化echarts实例
    this.chartInstance = echarts.init(this.chartContainer.nativeElement);
  }

}
