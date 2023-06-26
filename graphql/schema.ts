// graphql/schema.ts

import { builder } from "./builder";
import "./types/User"
import "./types/chuck_norris_post"

export const schema = builder.toSchema()
