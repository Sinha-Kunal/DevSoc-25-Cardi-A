import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export default function Pricing() {
  const tiers = [
    {
      name: "Basic",
      price: "Free",
      description: "Essential health monitoring for everyone",
      features: ["Ayurvedic pulse analysis", "Basic health insights", "Emergency SOS", "Limited app features"],
      cta: "Start for Free",
      mostPopular: false,
    },
    {
      name: "Premium",
      price: "₹299/month",
      description: "Advanced health monitoring and personalized insights",
      features: [
        "All Basic features",
        "Advanced AI-driven health analysis",
        "Personalized health recommendations",
        "Stress tracking and management",
        "Unlimited app access",
        "24/7 priority support",
      ],
      cta: "Start Free Trial",
      mostPopular: true,
    },
  ]

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Choose the plan that's right for you and start your journey to better health today.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${tier.mostPopular ? "border-2 border-primary" : "border border-gray-200"}`}
            >
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-semibold text-gray-900">{tier.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
                  {tier.name === "Premium" && <span className="text-base font-medium text-gray-500">/month</span>}
                </p>
                <Button className="mt-8 block w-full" size="lg">
                  {tier.cta}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block text-primary">Start your free trial today.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Experience the power of CardiA risk-free. Start your 14-day trial of our Premium plan and discover how
                our unique blend of Ayurvedic wisdom and AI can transform your health monitoring.
              </p>
              <Button className="mt-8" size="lg">
                Start free trial
              </Button>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <Image
              className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/placeholder.svg"
              alt="App screenshot"
              width={1000}
              height={600}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
            {[
              {
                question: "What is CardiA?",
                answer:
                  "CardiA is a smart health monitoring device that combines Ayurvedic pulse analysis with AI-driven technology to provide comprehensive health insights and personalized recommendations.",
              },
              {
                question: "How does CardiA work?",
                answer:
                  "CardiA uses advanced sensors to analyze your pulse and other vital signs. Our AI algorithms then interpret this data, combining it with Ayurvedic principles to provide holistic health insights.",
              },
              {
                question: "Is CardiA suitable for everyone?",
                answer:
                  "CardiA is designed for adults of all ages who are interested in proactive health monitoring. However, it's always best to consult with your healthcare provider before starting any new health regimen.",
              },
              {
                question: "What's the difference between the Basic and Premium plans?",
                answer:
                  "The Basic plan offers essential health monitoring features, while the Premium plan provides advanced AI-driven analysis, personalized recommendations, and additional features like stress tracking.",
              },
              {
                question: "How accurate is CardiA's health monitoring?",
                answer:
                  "CardiA's technology has been rigorously tested and refined. While it provides valuable insights, it's not a substitute for professional medical advice or diagnosis.",
              },
              {
                question: "Can I cancel my Premium subscription at any time?",
                answer:
                  "Yes, you can cancel your Premium subscription at any time. Your benefits will continue until the end of your current billing cycle.",
              },
            ].map((faq) => (
              <div key={faq.question}>
                <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

