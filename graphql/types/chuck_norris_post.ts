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