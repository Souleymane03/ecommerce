import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";



export const client = createClient({
    projectId:process.env.NEXT_PUBLIC_SANIT_PROJECT_ID,
    apiVersion:"2023-02-24",
    dataset:'production',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_PUBLIC_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);