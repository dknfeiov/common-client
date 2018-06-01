import { HttpService } from './../../service/http.service';
import { CONFIG } from './../../common/CONFIG';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportService {

    constructor(
        private http: HttpService
    ) { }

    public tagList() {
        return this.http.get(CONFIG[CONFIG.serviceType].tagList, {});
    }

    public docList(param) {
        return this.http.get(CONFIG[CONFIG.serviceType].docList, param);
    }

    public getChartTypes() {
        return [
            { value: ChartTypeEnum.Radar, name: '雷达图' },
            // { value: ChartTypeEnum.Column, name: '柱状图' }
        ];
    }

    // 获取图表基础配置
  public getBaseOption() {
    return {
      color: ['#687882', '#EF7373 '],
      tooltip: {},
      legend: {
        top: 15,
        itemGap: 100,
        itemWidth: 6,
        textStyle: {
          color: '#333333',
          fontSize: 14
        },
        selectedMode: false
      },
      // 雷达配置
      radar: {
        radius: '70%',
        center: ['50%', '55%'],
        name: {
          textStyle: {
            color: '#999999',
            fontSize: 14
          }
        }
      },
      series: []
    };
  }

}


enum ChartTypeEnum {
    Radar = 1,
    Column = 2
}
