"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import pricing from '../../public/pricing-top.png'
import { IoDocumentText } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from '../../styles/salePage.module.css'
import { getCheckoutUrl } from '../lib/stripe';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';


const faqs = [
{
  question: "How does the free 7-day trial work?",
  answer: "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."
},
{
  question: "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
  answer: "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
},
{
  question: "What's included in the Premium plan?",
  answer: "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
},
{
  question: "Can I cancel during my trial or subscription?",
  answer: "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
},
]

const page = () => {


  const [plan, setPlan ] = useState<"yearly" | "monthly">("yearly")
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter();

const handleCheckout = async () => {
  const priceId = plan === "yearly"
    ? process.env.NEXT_PUBLIC_YEARLY_PRICE_ID!
    : process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID!;
    console.log("PRICE ID:", priceId)

  try {
    const checkoutUrl = await getCheckoutUrl(auth.app, priceId);
    router.push(checkoutUrl);
  } catch (error) {
    console.error("Checkout error:", error);
  }
};



  return (
      <div className={styles.page__wrapper}>
        <div className={styles.plan}>
          <div className={styles["plan__header--wrapper"]}>
            <div className={styles.plan__header}>
              <div className={styles.plan__title}>
                Get unlimited access to many amazing books to read
              </div>
              <div className={styles["plan__sub--title"]}>
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className={styles["plan__img--mask"]}>
                <Image src={pricing} alt="pricing" />
              </figure>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.container}>

              <div className={styles["plan__features--wrapper"]}>
                <div className={styles.plan__features}>
                  <figure className={styles["plan__features--icon"]}>
                    <IoDocumentText />
                  </figure>
                  <div className={styles["plan__features--text"]}>
                    <b>Key ideas in few min</b> with many books to read
                  </div>
                </div>
                <div className={styles.plan__features}>
                  <figure className={styles["plan__features--icon"]}>
                    <RiPlantFill />
                  </figure>
                  <div className={styles["plan__features--text"]}>
                    <b>3 million</b> people growing with Summarist everyday
                  </div>
                </div>
                <div className={styles.plan__features}>
                  <figure className={styles["plan__features--icon"]}>
                    <FaHandshake />
                  </figure>
                  <div className={styles["plan__features--text"]}>
                    <b>Precise recommendations</b> collections curated by experts
                  </div>
                </div>
              </div>

              <div className={styles["section__title"]}>Choose the plan that fits you</div>

              <div className={`${styles["plan__card"]} ${plan === "yearly" ? styles["plan__card--active"] : ""}`}
              onClick={() => setPlan("yearly")}
              >
                <div className={styles["plan__card--circle"]}>
                  {plan === "yearly" && <div className={styles["plan__card--dot"]}></div>}
                </div>
                <div className={styles["plan__card--content"]}>
                  <div className={styles["plan__card--title"]}>Premium Plus Yearly</div>
                  <div className={styles["plan__card--price"]}>$99.99/year</div>
                  <div className={styles["plan__card--text"]}>7-day free trial included</div>
                </div>
              </div>


              <div className={styles["plan__card--separator"]}>
                <div className={styles.plan__separator}>or</div>
              </div>

              <div className={`${styles["plan__card"]} ${plan === "monthly" ? styles["plan__card--active"] : ""}`}
              onClick={() => setPlan("monthly")}
              >
                <div className={styles["plan__card--circle"]}>
                  {plan === "monthly" && <div className={styles["plan__card--dot"]}></div>}
                </div>
                <div className={styles["plan__card--content"]}>
                  <div className={styles["plan__card--title"]}>Premium Monthly</div>
                  <div className={styles["plan__card--price"]}>$9.99/month</div>
                  <div className={styles["plan__card--text"]}>No trial included</div>
                </div>
              </div>

              <div className={styles["plan__card--cta"]}>
                <span className={styles["btn__wrapper"]}>
                  <button className={styles.btn} style={{ width: '300px' }} onClick={handleCheckout}>
                    {plan === "yearly" ? <span>Start your free 7-day trial</span> : <span>Start your first month</span>}
                  </button>
                </span>
                <div className={styles.plan__disclaimer}>
                  {plan === "yearly" ? <span>Cancel your trial at any time before it ends, and you won&apos;t be charged</span> : <span>30-day money back guarentee, no questions asked.</span>}
                </div>
              </div>

              <div className={styles["faq__wrapper"]}>
                {faqs.map((faq, index) => (
                <div key={index} className={styles["accordion__card"]}>
                  <div 
                  className={styles["accordion__header"]}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <div className={styles["accordion__title"]}>
                      {faq.question}
                    </div>
                    {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                  <div className={`${styles.collapse} ${openIndex === index ? styles.show : ""}`}>
                    <div className={styles["accordion__body"]}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
                ))}
              </div>

            </div>
          </div>
          <section id="footer">
            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles["footer__top--wrapper"]}>
                  <div className={styles.footer__block}>
                    <div className={styles["footer__link--title"]}>Actions</div>
                    <div>
                      <div className={styles["footer__link--wrapper"]}>
                          <div className={styles.footer__link}>Summarist Magazine</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Cancel Subscription</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Help</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Contact Us</div>
                      </div>
                    
                    </div>
                  </div>
                  <div className={styles.footer__block}>
                    <div className={styles["footer__link--title"]}>Useful Links</div>
                    <div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Pricing</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Summarist Business</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Gift Cards</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Authors & Publishers</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.footer__block}>
                    <div className={styles["footer__link--title"]}>Company</div>
                    <div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>About</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Careers</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Partners</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Code of Conduct</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.footer__block}>
                    <div className={styles["footer__link--title"]}>Other</div>
                    <div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Sitemap</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Legal Notice</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Terms of Service</div>
                      </div>
                      <div className={styles["footer__link--wrapper"]}>
                        <div className={styles.footer__link}>Privacy Policies</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles["footer__copyright--wrapper"]}>
                  <div className={styles.footer__copyright}>
                    Copyright &copy; 2026 Summarist
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
  )
}

export default page