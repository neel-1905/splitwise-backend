import { prisma } from "../../lib/prisma";
import { CreateExpenseInput } from "./expense.schema";

export const createExpense = async (
  data: CreateExpenseInput,
  paidById: string,
) => {
  const payerMembership = await prisma.groupMember.findFirst({
    where: {
      groupId: data.groupId,
      userId: paidById,
    },
  });

  if (!payerMembership) throw new Error("Unauthorized");

  const splitTotal = data.splits.reduce(
    (sum: number, split: any) => sum + split.amount,
    0,
  );

  if (splitTotal !== data.amount)
    throw new Error("Split total must be equal to expense amount");

  for (const split of data.splits) {
    const membership = await prisma.groupMember.findFirst({
      where: {
        groupId: data.groupId,
        userId: split.userId,
      },
    });

    if (!membership) throw new Error("All split users must belong to group");
  }

  const expense = await prisma.$transaction(async (tx) => {
    const createdExpense = await tx.expense.create({
      data: {
        title: data.title,
        amount: data.amount,
        groupId: data.groupId,
        paidById,
      },
    });

    await tx.expenseSplit.createMany({
      data: data.splits.map((split) => ({
        expenseId: createdExpense.id,
        userId: split.userId,
        amount: split.amount,
      })),
    });

    return createdExpense;
  });

  return expense;
};

export const getGroupExpenses = async (groupId: string, userId: string) => {
  const membership = await prisma.groupMember.findFirst({
    where: {
      groupId,
      userId,
    },
  });

  if (!membership) throw new Error("Unauthorized");

  const expenses = await prisma.expense.findMany({
    where: {
      groupId,
    },

    include: {
      paidBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      splits: {
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return expenses;
};
