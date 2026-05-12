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

export const addGroupMember = async (
  groupId: string,
  creatorId: string,
  userId: string,
) => {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
      createdById: creatorId,
    },
  });

  if (!group) throw new Error("Group not found");

  const existingMember = await prisma.groupMember.findFirst({
    where: {
      userId,
      groupId,
    },
  });

  if (existingMember) throw new Error("User is already a part of the group");

  const member = await prisma.groupMember.create({
    data: {
      groupId,
      userId,
    },
  });

  return member;
};

export const removeMember = async (
  groupId: string,
  creatorId: string,
  userId: string,
) => {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId,
      createdById: creatorId,
    },
  });

  if (!group) {
    throw new Error("Unauthorized");
  }

  const member = await prisma.groupMember.findFirst({
    where: {
      groupId,
      userId,
    },
  });

  if (!member) {
    throw new Error("Member not found");
  }

  if (group.createdById === userId) {
    throw new Error("Creator cannot be removed");
  }

  await prisma.groupMember.delete({
    where: {
      id: member.id,
    },
  });

  return true;
};
