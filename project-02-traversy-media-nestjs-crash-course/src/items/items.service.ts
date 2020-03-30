import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '1',
      name: 'Raflp',
      description: 'no need to',
      qty: 100,
    },
    {
      id: '2',
      name: 'Maxlp',
      qty: 100,
    },
  ];
  getAllItems() {
    return this.items;
  }

  findOne(id) {
    return this.items.find(item => item.id === id);
  }
}
