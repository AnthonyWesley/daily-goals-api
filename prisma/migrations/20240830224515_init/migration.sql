-- CreateTable
CREATE TABLE "users" (
    "ip" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("ip")
);

-- CreateTable
CREATE TABLE "daySales" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sales" DOUBLE PRECISION NOT NULL,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "daySales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "monthlyGoal" DOUBLE PRECISION NOT NULL,
    "workingDays" INTEGER NOT NULL,
    "userIp" TEXT NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ip_key" ON "users"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "daySales_id_key" ON "daySales"("id");

-- CreateIndex
CREATE UNIQUE INDEX "goals_id_key" ON "goals"("id");

-- AddForeignKey
ALTER TABLE "daySales" ADD CONSTRAINT "daySales_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_userIp_fkey" FOREIGN KEY ("userIp") REFERENCES "users"("ip") ON DELETE CASCADE ON UPDATE CASCADE;
