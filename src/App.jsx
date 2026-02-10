import { useState, useEffect, useRef } from "react";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";

const SURPRISE_IMAGES = [
  "https://image2url.com/r2/default/images/1770701273518-c46052c0-fb9a-4d8c-8abb-6398a620f6ef.jpeg",
  "https://image2url.com/r2/default/images/1770701274645-db624a0d-149c-45f6-8081-c38ea989e6c2.jpeg",
  "https://image2url.com/r2/default/images/1770701276408-7cc74466-3e52-4823-bea8-3465dbf11391.jpeg",
  "https://image2url.com/r2/default/images/1770701277769-c93d9643-209b-452e-83d2-4e855154b43d.jpeg",
  "https://image2url.com/r2/default/images/1770701279093-54dac772-8828-4652-9cbe-a9e960beb300.jpeg",
  "https://image2url.com/r2/default/images/1770701280073-87ee54b9-2bd2-4548-b6d6-4ce268fff0b2.jpeg",
  "https://image2url.com/r2/default/images/1770701281086-14f51c5b-d737-4365-ba74-71d1644ef453.jpeg",
  "https://image2url.com/r2/default/images/1770701281903-6ec9be5a-b8c4-4870-95b2-93030bd0a9c2.jpeg",
  "https://image2url.com/r2/default/images/1770701283758-222e1b26-654f-48ac-8c0e-a827e0ad20a7.jpeg",
  "https://image2url.com/r2/default/images/1770701284968-4872cf7c-eedd-4cc2-af13-cdc70e8d6d60.jpeg",
  "https://image2url.com/r2/default/images/1770701285878-709dd8c9-f5b8-46d3-a2d5-53c4b90dc919.jpeg",
  "https://image2url.com/r2/default/images/1770701286696-b83f89d9-dbf6-4546-8712-d38d7dc995ba.jpeg",
  "https://image2url.com/r2/default/images/1770701287561-6c64ad9f-25df-4846-b966-9c2aa3e40cb6.jpeg",
  "https://image2url.com/r2/default/images/1770701289355-238a7326-cdf2-4895-94fb-d3778e7d3124.jpeg",
  "https://image2url.com/r2/default/images/1770701290139-40041729-3c68-426d-aae8-c68fbdff7868.jpeg",
  "https://image2url.com/r2/default/images/1770701290951-7becc56e-9f7d-4056-835b-414421db5881.jpeg",
  "https://image2url.com/r2/default/images/1770701291718-b51a75ff-e02b-4a14-98c3-5a1641299e57.jpeg",
  "https://image2url.com/r2/default/images/1770701292409-87f5c04f-47c9-4907-850e-6852cd2ff8b6.jpeg",
  "https://image2url.com/r2/default/images/1770701293209-82a87d41-afbd-4e48-ba41-628c1a33aaed.jpeg",
  "https://image2url.com/r2/default/images/1770701294637-a9bb5713-0518-4c88-86ca-7433c4c45bdf.jpeg",
  "https://image2url.com/r2/default/images/1770701295385-c8fefcd3-266a-4caa-bf63-da472b6c8830.jpeg",
  "https://image2url.com/r2/default/images/1770701296094-8b6d1a7e-078c-4d19-82d0-492e185cc83d.jpeg",
  "https://image2url.com/r2/default/images/1770701296845-6d077508-35df-4394-b154-92b0ab999c39.jpeg",
  "https://image2url.com/r2/default/images/1770701297527-e6521325-63d0-4e86-9805-a116fff4043c.jpeg",
  "https://image2url.com/r2/default/images/1770701298310-d29218a4-5aa6-460c-abb6-cc7c856a3ff8.jpeg",
  "https://image2url.com/r2/default/images/1770701299827-330e5b3c-90e0-4890-9e65-2688a3bbe146.jpeg",
  "https://image2url.com/r2/default/images/1770701300647-edd1a4ed-f361-4048-9aba-5f3d449c8264.jpeg",
  "https://image2url.com/r2/default/images/1770701301440-23a00a53-2483-4422-9cd6-9451cf088632.jpeg",
  "https://image2url.com/r2/default/images/1770701302232-b96e4107-131a-4162-9472-72622b7a47cf.jpeg",
];

const SURPRISE_TEXTS = [
  "What? dont want to leave?",
  "You really thought that it ended here, didnt you? lol",
  "Ofcourse I won't make it that short! DUMB!",
  "We will see our memories, our faces",
  "And admire each other until we fall in love the 100000th time again",
  "And Don't worry about how long this will last",
  "The pictures will end before the song does",
  "So let's dive in together",
];

const GALLERY_CAPTIONS = [
  "Being away from you feels strange.",
  "You're always on my mind.",
  "We've shared so much.",
  "And I still think about it all.",
  "I felt calm with you.",
  "I never had to pretend.",
  "I could just be me.",
  "Nothing was forced.",
  "Nothing had to be perfect.",
  "It just worked.",
  "And that still makes me smile.",
  "You made me feel safe.",
  "Seen.",
  "Loved.",
  "For every little moment.",
  "For every shared smile.",
  "For every quiet second.",
  "Even the simple days.",
  "They stay with me.",
  "They always will.",
  "You mean more than you know.",
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Surprise states
  const [surpriseTriggered, setSurpriseTriggered] = useState(false);
  const [surpriseStage, setSurpriseStage] = useState("waiting"); // waiting, loading, text, gallery, final, done
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showLoveYou, setShowLoveYou] = useState(false);

  const yesButtonSize = noCount * 20 + 16;

  // refs for timers and visibility
  const loyaltyTimerRef = useRef(null);
  const elapsedRef = useRef(0);
  const pageVisibleRef = useRef(true);
  const galleryStepRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Start loyalty timer when yesPressed and not already triggered
  useEffect(() => {
    if (!yesPressed || surpriseTriggered) return;

    const handleVisibility = () => {
      pageVisibleRef.current = !document.hidden;
      if (!pageVisibleRef.current) {
        // reset elapsed if user leaves
        elapsedRef.current = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    loyaltyTimerRef.current = setInterval(() => {
      if (pageVisibleRef.current) {
        elapsedRef.current += 1;
        if (elapsedRef.current >= 30) {
          clearInterval(loyaltyTimerRef.current);
          setSurpriseTriggered(true);
          setSurpriseStage("loading");
        }
      }
    }, 1000);

    return () => {
      clearInterval(loyaltyTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [yesPressed, surpriseTriggered]);

  // Surprise loading -> text
  useEffect(() => {
    if (surpriseStage !== "loading") return;
    const t = setTimeout(() => {
      setSurpriseStage("text");
      setCurrentTextIndex(0);
    }, 2500);
    return () => clearTimeout(t);
  }, [surpriseStage]);

  // Text sequence
  useEffect(() => {
    if (surpriseStage !== "text") return;

    if (currentTextIndex < SURPRISE_TEXTS.length) {
      const t = setTimeout(() => {
        setCurrentTextIndex((i) => i + 1);
      }, 5200); // Match cinematic text animation (5s) + breath (200ms)
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setSurpriseStage("gallery");
        // initialize gallery with first 4 (or fewer if not enough)
        const initial = SURPRISE_IMAGES.slice(0, 4);
        setVisibleImages(initial);
        setNextImageIndex(Math.min(4, SURPRISE_IMAGES.length));
        setCurrentCaptionIndex(0);
      }, 1000); // Cinematic pause before gallery
      return () => clearTimeout(t);
    }
  }, [surpriseStage, currentTextIndex]);

  // Gallery logic
  useEffect(() => {
    if (surpriseStage !== "gallery") return;
    if (visibleImages.length === 0) return;

    const total = SURPRISE_IMAGES.length;

    galleryStepRef.current = setInterval(() => {
      setVisibleImages((curr) => {
        const nextIdx = nextImageIndex;
        // fade out will be handled by CSS class on first element through key change
        const newArr = curr.slice(1);
        if (nextIdx < total) {
          newArr.push(SURPRISE_IMAGES[nextIdx]);
          setNextImageIndex(nextIdx + 1);
        }
        return newArr;
      });
    }, 3200); // Cinematic pacing for image transitions

    return () => clearInterval(galleryStepRef.current);
  }, [surpriseStage, visibleImages, nextImageIndex]);

  // Gallery captions
  useEffect(() => {
    if (surpriseStage !== "gallery") return;

    const captionInterval = setInterval(() => {
      setCurrentCaptionIndex((i) => {
        if (i < GALLERY_CAPTIONS.length - 1) {
          return i + 1;
        }
        return i;
      });
    }, 4000); // Show a new caption every 4 seconds for slower, comfortable reading

    return () => clearInterval(captionInterval);
  }, [surpriseStage]);

  // detect end of gallery: when nextImageIndex >= total and visibleImages are the last set
  useEffect(() => {
    if (surpriseStage !== "gallery") return;
    const total = SURPRISE_IMAGES.length;
    if (nextImageIndex >= total) {
      // wait until we've cycled to show final images for a bit
      const t = setTimeout(() => {
        setSurpriseStage("final");
        setShowFinalMessage(true);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [nextImageIndex, surpriseStage]);

  // final messages sequence
  useEffect(() => {
    if (surpriseStage !== "final") return;
    if (showFinalMessage) {
      const t = setTimeout(() => {
        setShowFinalMessage(false);
        setShowLoveYou(true);
      }, 5700); // Match final message animation timing (5.5s) + breath
      return () => clearTimeout(t);
    }
  }, [surpriseStage, showFinalMessage]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
      {/* Keep audio mounted so it never restarts */}
      {yesPressed && (
        <audio id="bg-audio" autoPlay controls style={{ position: "fixed", top: 10, left: 10, zIndex: 60 }}>
          <source src="https://www.dropbox.com/scl/fi/ic4f23hd28jtqgztuzfam/I-Wanna-Be-Yours-Arctic-Monkeys.mp3?rlkey=olvhwmu29tcewz2uxl3u8yvqs&st=zcnn2ei3&dl=1" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Surprise flow overlays (z-index high so audio stays) */}
      {surpriseTriggered && surpriseStage === "loading" && (
        <>
          <div className="back z-50"></div>
          <div className="heart z-51"></div>
        </>
      )}

      {surpriseTriggered && surpriseStage === "text" && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div 
            key={currentTextIndex}
            className="text-white text-4xl md:text-5xl text-center max-w-2xl animate-text-message px-6"
          >
            {currentTextIndex < SURPRISE_TEXTS.length
              ? SURPRISE_TEXTS[currentTextIndex]
              : ""}
          </div>
        </div>
      )}

      {surpriseTriggered && surpriseStage === "gallery" && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
          <div className="flex gap-4 h-full items-center justify-start pl-8 overflow-hidden">
            {visibleImages.map((img, idx) => (
              <img
                key={`${idx}-${img}`}
                src={img}
                alt={`mem-${idx}`}
                className={`h-72 w-72 object-cover rounded-lg ${
                  idx === 0 ? "animate-gallery-fade" : "animate-gallery-slide"
                }`}
                style={{ marginRight: 8 }}
              />
            ))}
          </div>
          {/* Gallery captions with gentle vertical hover and varying positions */}
          {(() => {
            const positions = [
              "caption-bottom-center",
              "caption-bottom-left",
              "caption-top-right",
              "caption-top-left",
            ];
            const positionClass = positions[currentCaptionIndex % 4];
            return (
              <div key={currentCaptionIndex} className={`${positionClass} z-[51]`}>
                <div className="text-white text-lg md:text-xl text-center animate-caption-fade motion-drift-float px-8 inline-block">
                  {GALLERY_CAPTIONS[currentCaptionIndex]}
                </div>
                <span className="inline-block animate-heart-pop-in ml-2 opacity-0">❤️</span>
              </div>
            );
          })()}
        </div>
      )}

      {surpriseTriggered && surpriseStage === "final" && showFinalMessage && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-white text-3xl md:text-4xl text-center max-w-2xl animate-final-message px-6">
            You are not just a Valentine to me, but a soul that I can't live without
          </div>
        </div>
      )}

      {surpriseTriggered && surpriseStage === "final" && showLoveYou && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center">
            <div className="final-love text-6xl md:text-7xl font-bold">I love you</div>
            <div className="final-hearts" aria-hidden>
              <div className="final-heart small delay-1">❤️</div>
              <div className="final-heart large delay-2">💖</div>
              <div className="final-heart small delay-3">❤️</div>
              <div className="final-heart large delay-4">💗</div>
              <div className="final-heart small delay-5">❤️</div>
            </div>
          </div>
        </div>
      )}

      {/* Original UI (still shown under overlays) */}
      {!surpriseTriggered && (
        <>
          {isLoading && (
            <>
              <div className="back"></div>
              <div className="heart"></div>
            </>
          )}

          {!isLoading && yesPressed ? (
            <div className="happy-page-bg w-full h-screen flex flex-col items-center justify-center">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2p2MmMwbncyM2YyM2lnM2ppY2YxZDd6a3NmcGVpNXIzYXZucDRlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c7G6drkobIQXRJwX5v/giphy.gif"
                alt="yay"
              />
              <div className="text-4xl md:text-6xl font-bold my-4 text-center">
                <span className="text-red-600">Welcome Home Love.</span>
                <br />
                <span className="text-white">Happy Valentine's Day ❤️</span>
              </div>
            </div>
          ) : (
            <>
              <img src={lovesvg} className="fixed animate-pulse top-10 md:left-24 left-6 md:w-40 w-28" />
              <img
                src={lovesvg2}
                className="fixed bottom-16 -z-10 animate-pulse md:right-24 right-10 md:w-40 w-32"
              />
              <img
                className="h-[230px] rounded-lg shadow-lg"
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp"
                alt="bear"
              />
              <h1 className="text-4xl md:text-6xl my-4 text-center">Will you be my Valentine?</h1>
              <div className="flex flex-wrap justify-center gap-2 items-center">
                <button
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                  style={{ fontSize: yesButtonSize }}
                  onClick={() => {
                    setIsLoading(true);
                    setYesPressed(true);
                  }}
                >
                  Yes
                </button>
                <button onClick={handleNoClick} className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4">
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
            </>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <div className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 border p-1 rounded border-rose-300">
      Made with {" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
    </div>
  );
};
