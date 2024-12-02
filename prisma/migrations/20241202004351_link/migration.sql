-- CreateTable
CREATE TABLE "link" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);
