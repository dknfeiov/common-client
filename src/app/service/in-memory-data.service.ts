import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

/* 模拟数据 */
@Injectable()
export class InMemoryDataService implements InMemoryDbService {

    // 模拟数据 需要id ，实际业务使用 _id :Mongpdb唯一标识
    createDb() {
        const tags = [
            { id: 1, _id: '1', name: 'Vue', type: 'Framework', create_time: '2018-02-02' },
            { id: 2, _id: '2', name: 'React', type: 'Framework', create_time: '2018-02-02' },
            { id: 3, _id: '3', name: 'Angular', type: 'Framework', create_time: '2018-02-02' },
            { id: 4, _id: '4', name: 'Angular.js', type: 'Framework', create_time: '2018-02-02' },
            { id: 5, _id: '5', name: 'Javascript', type: 'language', create_time: '2018-02-02' }
        ];

        const users = [
            { id: 1, _id: '1', loginName: 'admin', password: 'admin', username: '管理员', create_time: '2018-02-02' }
        ];

        const docs = [
            { id: 1, _id: '1', name: 'Vue操作文档', describe: '文档', tags: '1,5', create_time: '2018-02-02' },
            { id: 2, _id: '2', name: 'React操作文档', describe: '文档', tags: '2,5', create_time: '2018-02-02' },
            { id: 3, _id: '3', name: 'Angular操作文档', describe: '文档', tags: '3,5', create_time: '2018-02-02' },
            { id: 4, _id: '4', name: 'Angular.js操作文档', describe: '文档', tags: '4,5', create_time: '2018-02-02' },
            { id: 2, _id: '2', name: 'ReactNative操作文档', describe: '文档', tags: '2,5', create_time: '2018-02-02' },
        ];

        return { tags, users, docs };
    }

}
