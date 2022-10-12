import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import moment from "moment";

const prisma = new PrismaClient();

async function main() {
  await prisma.payoutStatus.deleteMany({});

  await prisma.payoutStatus.create({
    data: {
      name: "Waiting for Brand Invoice",
      value: "Waiting for Brand Invoice",
    },
  });

  await prisma.payoutStatus.create({
    data: {
      name: "Payment Pending",
      value: "Payment Pending",
    },
  });

  await prisma.payoutStatus.create({
    data: {
      name: "Paid",
      value: "Paid",
    },
  });

  await prisma.payoutPeriod.deleteMany({});

  //
  // Feature: Seed Payouts Periods
  // Description: Seed a system with the months between December 2019 and the current month
  //
  //
  let last_month = "December 2019";
  let month_index_aux = 0;
  do {
    if (month_index_aux > 0) {
      await prisma.payoutPeriod.create({
        data: {
          name: moment().subtract(month_index_aux, "month").format("MMMM YYYY"),
          value: moment()
            .subtract(month_index_aux, "month")
            .format("MMMM YYYY"),
        },
      });
    } else {
      await prisma.payoutPeriod.create({
        data: {
          name: moment().format("MMMM YYYY"),
          value: moment().format("MMMM YYYY"),
        },
      });
    }
    console.log(month_index_aux);
    month_index_aux++;
  } while (
    moment().subtract(month_index_aux, "month").format("MMMM YYYY") !==
    last_month
  );

  await prisma.systemUser.deleteMany({});

  const saltRounds = 12;

  bcrypt.hash("Th3B3stC0mp@ny1nth3w0rld", saltRounds, async (error, hash) => {
    await prisma.systemUser.create({
      data: {
        brand: "lexir",
        username: "Cheers Lexir",
        email: "cheers@lexir.com",
        password: hash,
        permissions: "super_admin",
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
