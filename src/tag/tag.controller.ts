import {Get, Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }

  @ApiOperation({ summary: 'Create tag' })
  @ApiResponse({ status: 201, description: 'The tag has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body('tag') tagData: CreateTagDto) {
    return this.tagService.create(tagData);
  }

  @ApiOperation({ summary: 'Update tag' })
  @ApiResponse({ status: 201, description: 'The tag has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  async update(@Param() params, @Body('tag') tagData: CreateTagDto) {
    return this.tagService.update(params.id, tagData);
  }

  @ApiOperation({ summary: 'Delete tag' })
  @ApiResponse({ status: 201, description: 'The tag has been successfully deleted.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  async delete(@Param() params) {
    return this.tagService.delete(params.id);
  }

}