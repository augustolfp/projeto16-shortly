CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" varchar(120) NOT NULL,
	"email" varchar(120) NOT NULL UNIQUE,
	"password" varchar(120) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);



CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"website" varchar(255) NOT NULL,
	"shortUrl" varchar(40) NOT NULL UNIQUE,
	"visitorsCounter" integer NOT NULL DEFAULT '0',
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL REFERENCES "users"("id"),
	"createdAt" timestamp with time zone NOT NULL DEFAULT NOW()
);




