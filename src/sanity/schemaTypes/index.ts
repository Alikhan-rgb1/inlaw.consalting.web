import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './post'
import {homeType} from './home'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, homeType],
}
