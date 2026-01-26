import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfileCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Mon profil</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
