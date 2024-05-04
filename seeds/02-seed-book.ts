import { Knex } from 'knex'
import { seedRow } from '../utils/knex-seed'

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await seedRow(
        knex,
        'book',
        { book_title: "Talking to Strangers" },
        {
            book_description: "The routine traffic stop that ends in tragedy. The spy who spends years undetected at the highest levels of the Pentagon. The false conviction of Amanda Knox. Why do we so often get other people wrong? Why is it so hard to detect a lie, read a face or judge a stranger's motives?",
            author: 'Malcolm Gladwell',
            publisher: 'PENGUIN BOOKS LTD',
            rating: 5,
            price_in_cent: 80,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681895504002/20200703121414220008.jpg",
            category_id: 1

        }
    )
    await seedRow(
        knex,
        'book',
        { book_title: "To Have or to Be?" },
        {
            book_description: "To Have Or to Be? is one of the seminal books of the second half of the 20th century. Nothing less than a manifesto for a new social and psychological revolution to save our threatened planet, this book is a summary of the penetrating thought of Eric Fromm.",
            author: 'Erich Fromm',
            publisher: 'Bloomsbury Academic',
            rating: 4,
            price_in_cent: 120,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682098647008/20201126172624903273.jpg",
            category_id: 2
        }
    )
    await seedRow(
        knex,
        'book',
        { book_title: "Beyond the Chains of Illusion" },
        {
            book_description: "First published in 1962 Beyond the Chains of Illusion is Fromm's landmark book about Marx and Freud. Here he delivers original readings of these hugely influential thinkers and, in doing so, offers us new ways of understanding the individual and society.",
            author: 'Erich Fromm',
            publisher: 'Bloomsbury Academic',
            rating: 3,
            price_in_cent: 80,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681742791005/ec1727144.jpg",
            category_id: 3
        }
    )
    await seedRow(
        knex,
        'book',
        { book_title: "The Secrets of the I Ching" },
        {
            book_description: "Originally discovered around 3,000 BCE, the I Ching is a collection of symbols that explain how patterns in the universe change and shift. These sixty-four symbols contain within them one of the most powerful keys to understanding the world around us. The Secrets of the I Ching is the definitive guide to understanding the ancient mysteries and foundations of the I Ching.",
            author: 'Dr. David S. Lee/ Joseph K. Kim',
            publisher: "ST. MARTIN'S PRESS",
            rating: 4,
            price_in_cent: 70,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/covers20230818161522/mainCoverImage1_1138861.jpg",
            category_id: 4

        }
    )
    await seedRow(
        knex,
        'book',
        { book_title: "Normal People" },
        {
            book_description: "Connell and Marianne grow up in the same small town in rural Ireland. The similarities end there; they are from very different worlds. When they both earn places at Trinity College in Dublin, a connection that has grown between them lasts long into the following years.",
            author: 'Sally Rooney',
            publisher: "FABER & FABER LTD",
            rating: 5,
            price_in_cent: 100,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/newItem/2023/06/26/202306261508512681699904008-01.jpg",
            category_id: 5

        }
    )

    await seedRow(
        knex,
        'book',
        { book_title: "Conversations with Friends" },
        {
            book_description: "Frances is a coolheaded and darkly observant young woman, vaguely pursuing a career in writing while studying in Dublin. Her best friend is the beautiful and endlessly self-possessed Bobbi. At a local poetry performance one night, they meet a well-known photographer, and as the girls are then gradually drawn into her world",
            author: 'Sally Rooney',
            publisher: "Hogarth",
            rating: 5,
            price_in_cent: 100,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681900675000/20190409071142275756.jpg",
            category_id: 6

        }
    )

    await seedRow(
        knex,
        'book',
        { book_title: "Beautiful World, Where Are You" },
        {
            book_description: "Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he'd like to travel to Rome with her. In Dublin, her best friend Eileen is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood.",
            author: 'Sally Rooney',
            publisher: "FABER & FABER LTD",
            rating: 4,
            price_in_cent: 100,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/2682177822005/o/2682177822005-03.JPG",
            category_id: 2

        }
    )


    await seedRow(
        knex,
        'book',
        { book_title: "The Art of Loving" },
        {
            book_description: "Many people are unable to love--and thus live--fully. Renowned psychoanalyst Erich Fromm has helped generations of men and women achieve rich and productive lives by developing their capacity to love. This Centennial Edition of his most enduring work, The Art of Loving, salutes the valuable lessons that are Fromm's legacy.",
            author: 'Erich Fromm',
            publisher: "Harper Perennial",
            rating: 5,
            price_in_cent: 120,
            book_image: "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682177720004/20201126172306282486.jpg",
            category_id: 2

        }
    )

    await seedRow(
        knex,
        'book',
        { book_title: "The Hunger Games" },
        {
            book_description: "Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
            author: 'Erich Fromm',
            publisher: "Suzanne Collins",
            rating: 3,
            price_in_cent: 90,
            book_image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg",
            category_id: 1

        }
    )


    await seedRow(
        knex,
        'book',
        { book_title: "The Glass Castle" },
        {
            book_description: "The Glass Castle is a remarkable memoir of resilience and redemption, and a revelatory look into a family at once deeply dysfunctional and uniquely vibrant. When sober, Jeannette's brilliant and charismatic father captured his children's imagination, teaching them physics, geology, and how to embrace life fearlessly. But when he drank, he was dishonest and destructive. Her mother was a free spirit who abhorred the idea of domesticity and didn't want the responsibility of raising a family.",
            author: 'Jeannette Walls',
            publisher: "Suzanne Collins",
            rating: 3,
            price_in_cent: 100,
            book_image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1523542886i/7445.jpg",
            category_id: 1

        }
    )
}
