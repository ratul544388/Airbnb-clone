import { Container } from "@/components/container"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const NotFound = () => {
  return (
    <Container elem="main" className="min-h-main flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl text-muted-foreground font-semibold mt-3">Page not found</p>
      <Link href="/" className={buttonVariants({size: "lg", className: "mt-5"})}>Go back to Home Page</Link>
    </Container>
  )
}

export default NotFound
