import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AppointmentScheduler() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Schedule a Visit</CardTitle>
        <CardDescription>
          Choose your preferred date and time to visit the shelter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              required
              min="09:00"
              max="17:00"
            />
          </div>
          <Button type="submit" className="w-full">
            Schedule Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
