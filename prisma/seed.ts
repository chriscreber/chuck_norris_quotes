import { PrismaClient } from '@prisma/client';
import { chuck_norris_posts } from '../data/chuck_norris_posts';

const prisma = new PrismaClient();

async function main() {
  console.log('in seed file');
  await prisma.user.create({
    data: {
      email: 'test@gmail.com',
      role: 'ADMIN',
    },
  });

  const keysToExtract = ["icon_url", "value"];

  const filteredCNPosts = chuck_norris_posts.map(function(hsh, index){
    return Object.entries(hsh).reduce(
        (acc, [key, value]) => {
            console.log('hi');
            console.log(acc, key, value);
            if (keysToExtract.includes(key)) {
                acc[key] = value;
            }
            return acc;
        },
        {}
    )
  });

  await prisma.chuck_norris_post.createMany({
    data: filteredCNPosts,
  });
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
