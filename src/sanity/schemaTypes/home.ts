import {defineField, defineType} from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'offers',
      title: 'Offer Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineField({
          name: 'stat',
          type: 'object',
          fields: [
            defineField({name: 'value', type: 'string', title: 'Value (e.g. 300+)'}),
            defineField({name: 'label', type: 'string', title: 'Label'}),
          ],
        }),
      ],
    }),
  ],
})
