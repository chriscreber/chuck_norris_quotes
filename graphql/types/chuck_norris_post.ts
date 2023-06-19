import { builder } from "../builder";

builder.prismaObject('chuck_norris_post', {
  fields: (t) => ({
    id: t.exposeID('id'),
    icon_url: t.exposeString('icon_url'),
    value: t.exposeString('value')
  }),
})


builder.queryField('chuck_norris_posts', (t) =>
  t.prismaConnection({
    type: 'chuck_norris_post',
    cursor: 'id',
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.chuck_norris_post.findMany({ ...query })
  })
)

// builder.queryField('link', (t) =>
//   t.prismaField({
//     type: 'Link',
//     nullable: true,
//     args: {
//       id: t.arg.id({ required: true })
//     },
//     resolve: (query, _parent, args, _info) =>
//       prisma.link.findUnique({
//         ...query,
//         where: {
//           id: Number(args.id),
//         }
//       })
//   })
// )

builder.mutationField('create_chuck_norris_post', (t) =>
  t.prismaField({
    type: 'chuck_norris_post',
    args: {
      icon_url: t.arg.string({ required: true }),
      value: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { icon_url, value } = args

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action")
      }

      const user = await prisma.user.findUnique({
        where: {
          email: (await ctx).user?.email,
        }
      })

      if (!user || user.role !== "ADMIN") {
        throw new Error("You don have permission ot perform this action")
      }

      return await prisma.chuck_norris_post.create({
        ...query,
        data: {
          icon_url,
          value,
        }
      })
    }
  })
)


// builder.mutationField('createLink', (t) =>
//   t.prismaField({
//     type: 'Link',
//     args: {
//       title: t.arg.string({ required: true }),
//       description: t.arg.string({ required: true }),
//       url: t.arg.string({ required: true }),
//       imageUrl: t.arg.string({ required: true }),
//       category: t.arg.string({ required: true }),
//     },
//     resolve: async (query, _parent, args, ctx) => {
//       const { title, description, url, imageUrl, category } = args

//       if (!(await ctx).user) {
//         throw new Error("You have to be logged in to perform this action")
//       }

//       const user = await prisma.user.findUnique({
//         where: {
//           email: (await ctx).user?.email,
//         }
//       })

//       if (!user || user.role !== "ADMIN") {
//         throw new Error("You don have permission ot perform this action")
//       }

//       return await prisma.link.create({
//         ...query,
//         data: {
//           title,
//           description,
//           url,
//           imageUrl,
//           category,
//         }
//       })
//     }
//   })
// )

// builder.mutationField('updateLink', (t) =>
//   t.prismaField({
//     type: 'Link',
//     args: {
//       id: t.arg.id({ required: true }),
//       title: t.arg.string(),
//       description: t.arg.string(),
//       url: t.arg.string(),
//       imageUrl: t.arg.string(),
//       category: t.arg.string(),
//     },
//     resolve: async (query, _parent, args, _ctx) =>
//       prisma.link.update({
//         ...query,
//         where: {
//           id: Number(args.id),
//         },
//         data: {
//           title: args.title ? args.title : undefined,
//           url: args.url ? args.url : undefined,
//           imageUrl: args.imageUrl ? args.imageUrl : undefined,
//           category: args.category ? args.category : undefined,
//           description: args.description ? args.description : undefined,
//         }
//       })
//   })
// )

// builder.mutationField('bookmarkLink', (t) =>
//   t.prismaField({
//     type: 'Link',
//     args: {
//       id: t.arg.id({ required: true })
//     },
//     resolve: async (query, _parent, args, ctx) => {
//       if (!(await ctx).user) {
//         throw new Error("You have to be logged in to perform this action")
//       }

//       const user = await prisma.user.findUnique({
//         where: {
//           email: (await ctx).user?.email,
//         }
//       })

//       if (!user) throw Error('User not found')

//       const link = await prisma.link.update({
//         ...query,
//         where: {
//           id: Number(args.id)
//         },
//         data: {
//           users: {
//             connect: [{ email: (await ctx).user?.email }]
//           }
//         }
//       })

//       return link
//     }
//   })
// )

// builder.mutationField('deleteLink', (t) =>
//   t.prismaField({
//     type: 'Link',
//     args: {
//       id: t.arg.id({ required: true })
//     },
//     resolve: async (query, _parent, args, _ctx) =>
//       prisma.link.delete({
//         ...query,
//         where: {
//           id: Number(args.id)
//         }
//       })
//   })
// )
