import { prisma } from "../../lib/prisma";

export const createGroup = async (name: string, userId: string) => {
  const group = await prisma.$transaction(async (tx) => {
    const createdGroup = await tx.group.create({
      data: {
        name,
        createdById: userId,
      },
    });

    await tx.groupMember.create({
      data: {
        userId,
        groupId: createdGroup.id,
      },
    });

    return createdGroup;
  });

  return group;
};

export const getUserGroups = async (userId: string) => {
  const groups = await prisma.group.findMany({
    where: {
      createdById: userId,
    },
    // include: {
    //   group: true,
    // },
  });
  return groups;
};

export const getAllGroups = async () => {
  const groups = await prisma.group.findMany();

  return groups;
};

export const getGroup = async (id: string, userId: string) => {
  const group = await prisma.group.findUnique({
    where: {
      id,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },

      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  return group;
};
