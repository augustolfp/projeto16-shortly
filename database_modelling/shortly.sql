CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL UNIQUE,
	"email" varchar(120) NOT NULL UNIQUE,
	"password" varchar(120) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"website" varchar(255) NOT NULL,
	"shortUrl" varchar(40) NOT NULL UNIQUE,
	"visitorsCounter" integer NOT NULL DEFAULT '0',
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW(),
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);




