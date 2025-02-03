import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function Features() {
  const features = [
    {
      name: "Ayurvedic Pulse Analysis",
      description:
        "Utilizes traditional Ayurvedic techniques to analyze your pulse and provide holistic health insights.",
      image: "/placeholder.svg",
    },
    {
      name: "AI-Driven Health Monitoring",
      description:
        "Advanced AI algorithms continuously analyze your health data to provide personalized recommendations.",
      image: "/placeholder.svg",
    },
    {
      name: "Stress Tracking",
      description: "Monitor and manage your stress levels with real-time biofeedback and guided relaxation techniques.",
      image: "/placeholder.svg",
    },
    {
      name: "Emergency SOS",
      description: "Instant SOS alerts and emergency response features for peace of mind.",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Features</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Discover CardiA's Capabilities
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Explore how CardiA's unique blend of Ayurvedic wisdom and cutting-edge technology can transform your health
            monitoring experience.
          </p>
        </div>

        <div className="mt-20">
          <Tabs defaultValue="pulse" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {features.map((feature) => (
                <TabsTrigger key={feature.name} value={feature.name.toLowerCase().replace(/\s+/g, "-")}>
                  {feature.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {features.map((feature) => (
              <TabsContent key={feature.name} value={feature.name.toLowerCase().replace(/\s+/g, "-")}>
                <Card>
                  <CardHeader>
                    <CardTitle>{feature.name}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.name}
                      width={800}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button>Learn more</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">How It Works</h3>
          <dl className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {[
              {
                name: "Wear",
                description:
                  "Simply wear the CardiA smart band on your wrist. It's comfortable and designed for 24/7 use.",
              },
              {
                name: "Monitor",
                description: "CardiA continuously monitors your vital signs and uses AI to analyze your health data.",
              },
              {
                name: "Analyze",
                description:
                  "Our unique algorithm combines Ayurvedic pulse analysis with modern health metrics for comprehensive insights.",
              },
              {
                name: "Act",
                description:
                  "Receive personalized health recommendations and alerts based on your real-time health data.",
              },
            ].map((item) => (
              <div key={item.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    {/* Icon */}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{item.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Ready to experience CardiA?</h3>
          <p className="mt-4 text-lg text-gray-500">
            Join thousands of users who have already transformed their approach to health monitoring.
          </p>
          <div className="mt-8">
            <Button size="lg">Get Started Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

