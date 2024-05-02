export type User = {
  id?: null | number
  username: string
  password: string
  email: string
  profile_pic: null | string
}

export type Category = {
  id?: null | number
  name: string
}

export type Book = {
  id?: null | number
  book_title: string
  book_description: string
  auther: string
  publisher: string
  rating: number
  book_image: string
  price_in_cent: number
  category_id: number
  category?: Category
}

export type Order = {
  id?: null | number
  user_id: number
  user?: User
  order_date: string
  total_amount_in_cent: number
}

export type OrderDetails = {
  id?: null | number
  order_id: number
  order?: Order
  book_id: number
  book?: Book
  quantity: number
  unit_price_in_cent: number
}
