import { Account, User, PrismaClient } from "@prisma/client";
// const { PrismaClient } = require("@prisma/client");
// const { Account, User } = require("@prisma/client");

const prisma = new PrismaClient();

const updateAccount = async (email: string, id: string) => {
  try {
    const res = await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        email: email,
      },
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

const main = async () => {
  const users = await prisma.user.findMany({
    include: {
      accounts: true,
    },
  });
  console.log(users);

  users.forEach((e) => {
    e.accounts.forEach((a) => updateAccount(e.email!, a.id));
  });
};

main();

export {};
