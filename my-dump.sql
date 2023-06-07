--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Link; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Link" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    "imageUrl" text NOT NULL,
    category text NOT NULL
);


ALTER TABLE public."Link" OWNER TO postgres;

--
-- Name: Link_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Link_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Link_id_seq" OWNER TO postgres;

--
-- Name: Link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Link_id_seq" OWNED BY public."Link".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    email text,
    image text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _LinkToUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_LinkToUser" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_LinkToUser" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Link id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link" ALTER COLUMN id SET DEFAULT nextval('public."Link_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Link; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Link" (id, "createdAt", "updatedAt", title, description, url, "imageUrl", category) FROM stdin;
1	2023-05-27 23:38:04.955	2023-05-27 23:38:04.955	Next.js	Fullstack React framework	https://nextjs.org	https://github.com/vercel.png	Open Source
2	2023-05-27 23:38:04.955	2023-05-27 23:38:04.955	Prisma	Next Generation ORM for TypeScript and JavaScript	https://prisma.io	https://github.com/prisma.png	Open Source
3	2023-05-27 23:38:04.955	2023-05-27 23:38:04.955	TailwindCSS	Utility-fist css framework	https://tailwindcss.com	https://github.com/tailwindlabs.png	Open Source
4	2023-05-27 23:38:04.955	2023-05-27 23:38:04.955	Apollo GraphQL	GraphQL implementation 	https://apollographql.com	https://www.apollographql.com/apollo-home.jpg	Open Source
5	2023-05-27 23:42:06.479	2023-05-27 23:42:06.479	asdf	asdf	asdf	https://via.placeholder.com/300	asdf
6	2023-05-28 01:09:43.418	2023-05-28 01:09:43.418	image	dfsas	dfsafds	https://'chris-creber-awesome-links-bucket' # Will be used on the client-side.s3.amazonaws.com/IMG_0030.jpeg	sdfsafas
7	2023-05-28 01:18:18.667	2023-05-28 01:18:18.667	image	dfsas	dfsafds	https://'chris-creber-awesome-links-bucket' # Will be used on the client-side.s3.amazonaws.com/IMG_0030.jpeg	sdfsafas
8	2023-05-28 01:20:40.361	2023-05-28 01:20:40.361	asdf	fasdfdf	wefewf	https://'chris-creber-awesome-links-bucket' # Will be used on the client-side.s3.amazonaws.com/IMG_0086.JPG	feef
9	2023-05-28 01:24:42.313	2023-05-28 01:24:42.313	fasdf	dfdfew	fafe	https://chris-creber-awesome-links-bucket.s3.amazonaws.com/81226846_1565954430224646_5238818837838692352_n.jpeg	efwef
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "createdAt", "updatedAt", email, image, role) FROM stdin;
1	2023-05-27 23:38:04.948	2023-05-27 23:38:04.948	test@gmail.com	\N	ADMIN
2	2023-05-27 23:39:32.661	2023-05-27 23:39:50.322	new@gmail.com	\N	ADMIN
3	2023-05-27 23:44:37.557	2023-05-27 23:44:37.557	asf@fjawe.com	\N	USER
4	2023-05-28 00:01:01.327	2023-05-28 00:01:01.327	sdfd@gmail.com	\N	USER
\.


--
-- Data for Name: _LinkToUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_LinkToUser" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
73b89979-30de-4883-9876-f431b121edbd	84a9a8e03a6d7bd08effdb5b1cf72b670295feb3f8c5d2b65957eedce66b379f	2023-05-27 16:38:02.903344-07	20230527233802_init	\N	\N	2023-05-27 16:38:02.875955-07	1
\.


--
-- Name: Link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Link_id_seq"', 9, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: Link Link_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Link"
    ADD CONSTRAINT "Link_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _LinkToUser_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_LinkToUser_AB_unique" ON public."_LinkToUser" USING btree ("A", "B");


--
-- Name: _LinkToUser_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_LinkToUser_B_index" ON public."_LinkToUser" USING btree ("B");


--
-- Name: _LinkToUser _LinkToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LinkToUser"
    ADD CONSTRAINT "_LinkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Link"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LinkToUser _LinkToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_LinkToUser"
    ADD CONSTRAINT "_LinkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

