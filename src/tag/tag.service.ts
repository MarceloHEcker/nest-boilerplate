import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tagData: CreateTagDto): Promise<TagEntity> {

    let tag = new TagEntity();
    tag.tag = tagData.tag;

    const newTag = await this.tagRepository.save(tag);
    return newTag;

  }

  async update(id: number, tagData: CreateTagDto): Promise<TagEntity> {
    let toUpdate = await this.tagRepository.findOne({ id: id});
    let updated = Object.assign(toUpdate, tagData);
    const tag = await this.tagRepository.save(updated);
    return tag;
  }
  
  async delete(id: number): Promise<DeleteResult> {
    return await this.tagRepository.delete({ id });
  }

}
