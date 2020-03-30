import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemDTO } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Item[] {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  findOne(@Param('id') id): Item {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() createItemDTO: CreateItemDTO): string {
    return `
        Name: ${createItemDTO.name}.
        Description: ${createItemDTO.description}.
        Quantity: ${createItemDTO.qty}.
    `;
  }

  @Put(':id')
  update(@Param('id') id, @Body() udpateItem: CreateItemDTO) {
    return `update id ${id}
    Name: ${udpateItem.name}
    `;
  }

  @Delete(':id')
  deleteItem(@Param('id') id): string {
    return `deteled id ${id}`;
  }
}
