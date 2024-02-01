import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CopyBlock, dracula } from "react-code-blocks";
import { RefObject, useEffect, useRef, useState, useMemo } from "react";


let screenSummary: {
  foreground_sec?: number;
  background_sec?: number;
  last_item_index?: number;
  items_count?: number;
  min_x_offset?: number;
  max_x_offset?: number;
  min_y_offset?: number;
  max_y_offset?: number;
  content_width?: number;
  content_height?: number;
} = {};

let segments: Array<{
  identifier: String;
  description: String;
  totalVisibleTime: number;
  visibleSince?: Date;
  maxScrollDepthY?: number;
}> = [];
let backgroundTime = 0;
let backgroundSince: Date | undefined = undefined;
const screenEntity = {
  id: "2c7f8c5d-6b8b-4a9b-8c3a-0b9c9a1f0b0e",
  name: "Snow App – Scroll Down",
};

function updateProduct(index: number, totalProducts: number) {
  screenSummary.last_item_index = Math.max(index, screenSummary.last_item_index ?? 0);
  screenSummary.items_count = Math.max(totalProducts, screenSummary.items_count ?? 0);
}

const loadedAt = new Date();

const observedElements: Array<{
  identifier: string;
  element: React.RefObject<HTMLDivElement>;
}> = [];

function onScroll() {
  const scrollView = document.getElementById("scroll-view");
  const scrollViewTop = document.getElementById("scroll-view-top");
  const scrollViewBottom = document.getElementById("scroll-view-bottom");

  const scrollViewRect = scrollView?.getBoundingClientRect();
  const scrollViewTopRect = scrollViewTop?.getBoundingClientRect();
  const scrollViewBottomRect = scrollViewBottom?.getBoundingClientRect();

  let yOffset = Math.max(0, (scrollViewRect?.top ?? 0) - (scrollViewTopRect?.top ?? 0) + 30); // 30 is the top border width

  const contentHeight = (scrollViewBottomRect?.top ?? 0) - (scrollViewTopRect?.top ?? 0);
  const viewHeight = (scrollViewRect?.bottom ?? 0) - (scrollViewRect?.top ?? 0);
  const contentWidth = (scrollViewRect?.right ?? 0) - (scrollViewRect?.left ?? 0);

  if (contentHeight < yOffset + viewHeight) {
    yOffset = Math.max(0, contentHeight - viewHeight);
  }

  screenSummary.min_y_offset = Math.min(yOffset, screenSummary.min_y_offset ?? 0);
  screenSummary.max_y_offset = Math.max(yOffset + viewHeight, screenSummary.max_y_offset ?? 0);

  screenSummary.content_height = contentHeight;
  screenSummary.content_width = contentWidth;
}

function useOnScreen(
  callback: (isVisible: boolean) => void,
  identifier: string
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        let parentRect = entry.target.parentElement?.getBoundingClientRect();
        let elementRect = entry.target.getBoundingClientRect();

        let scrollDepthY = 0;
        if (parentRect !== undefined) {
          if (elementRect.bottom < parentRect.bottom) {
            // scrolled over the element
            scrollDepthY = 100;
          } else {
            let diff = elementRect.bottom - parentRect.bottom;
            if (diff > elementRect.height) {
              scrollDepthY = 0;
            } else {
              scrollDepthY = Math.round((diff / elementRect.height) * 100);
            }
          }
        }

        console.log(parentRect, elementRect);
        console.log(scrollDepthY);

        callback(entry.isIntersecting);
      }),
    [ref]
  );
  observedElements.push({
    identifier,
    element: ref,
  });

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return ref;
}

function PhoneView({ background }: { background: boolean }) {
  if (background) {
    return (
      <div
        style={{
          width: "300px",
          height: "550px",
          border: "10px solid black",
          backgroundColor: "black",
        }}
      />
    );
  }

  let products = [
    {
      name: "Smart Home Security Camera System",
      description:
        "Keep your home safe with a high-definition camera system that provides real-time monitoring and alerts on your smartphone.",
    },
    {
      name: "Wireless Noise-Canceling Earbuds",
      description:
        "Immerse yourself in crystal-clear sound with these sleek and wireless earbuds featuring advanced noise-canceling technology.",
    },
    {
      name: "Foldable Electric Scooter",
      description:
        "Commute in style and eco-friendly with a foldable electric scooter that reaches speeds of up to 15 mph.",
    },
    {
      name: "Digital Air Fryer",
      description:
        "Enjoy guilt-free crispy meals with this digital air fryer that uses hot air circulation to cook with little to no oil.",
    },
    {
      name: "Fitness Tracker with Heart Rate Monitor",
      description:
        "Achieve your fitness goals with a smart tracker that monitors your heart rate, tracks steps, and provides insights into your workouts.",
    },
    {
      name: "Portable Espresso Maker",
      description:
        "Brew a perfect cup of espresso on the go with this compact and portable espresso maker, compatible with coffee grounds or capsules.",
    },
    {
      name: "Smart LED Plant Grow Light",
      description:
        "Help your indoor plants thrive with a smart LED grow light that mimics natural sunlight and can be controlled via a mobile app.",
    },
    {
      name: "Waterproof Bluetooth Speaker",
      description:
        "Take your music anywhere with a waterproof Bluetooth speaker, perfect for pool parties, beach outings, or hiking trips.",
    },
    {
      name: "Digital Drawing Tablet",
      description:
        "Unleash your creativity with a digital drawing tablet, equipped with pressure-sensitive pens for precise and intuitive drawing.",
    },
    {
      name: "Aromatherapy Essential Oil Diffuser",
      description:
        "Create a relaxing atmosphere at home with an essential oil diffuser that combines aromatherapy with color-changing LED lights.",
    },
    {
      name: "Collapsible Silicone Water Bottle",
      description:
        "Stay hydrated on the go with a collapsible silicone water bottle that folds down for easy storage when not in use.",
    },
    {
      name: "Solar-Powered Phone Charger",
      description:
        "Charge your devices on the move with a solar-powered phone charger, harnessing the power of the sun for sustainable energy.",
    },
    {
      name: "Virtual Reality Headset",
      description:
        "Immerse yourself in a virtual world with a VR headset, compatible with a wide range of games and experiences.",
    },
    {
      name: "Stainless Steel Insulated Travel Mug",
      description:
        "Keep your beverages hot or cold for hours with a stainless steel insulated travel mug featuring a leak-proof design.",
    },
    {
      name: "Foldable Laptop Stand",
      description:
        "Increase productivity and reduce neck strain with a foldable laptop stand that adjusts to different heights for ergonomic use.",
    },
    {
      name: "Smart Thermostat",
      description:
        "Save energy and control your home's temperature remotely with a smart thermostat that learns your preferences over time.",
    },
    {
      name: "Biodegradable Phone Case",
      description:
        "Protect your phone and the environment with a biodegradable phone case made from eco-friendly materials.",
    },
    {
      name: "Wireless Charging Pad",
      description:
        "Charge your Qi-enabled devices wirelessly with a sleek and compact charging pad that blends seamlessly with any environment.",
    },
    {
      name: "Portable UV-C Sanitizer Wand",
      description:
        "Ensure your surroundings are germ-free with a portable UV-C sanitizer wand that effectively eliminates bacteria and viruses.",
    },
    {
      name: "Smart Luggage with GPS Tracker",
      description:
        "Travel with peace of mind using smart luggage equipped with a GPS tracker, USB charging ports, and built-in weighing scale.",
    },
  ];

  useEffect(onScroll, []);

  return (
    <div
      id="scroll-view"
      style={{
        width: "300px",
        height: "550px",
        border: "10px solid black",
        borderTop: "30px solid black",
        borderBottom: "30px solid black",
        overflow: "scroll",
      }}
      onScroll={onScroll}
    >
      <span id="scroll-view-top" />
      <Box sx={{ mx: 2 }}>
        <h2>Products</h2>
      </Box>

      {products.map((product, i) => (
        <Box
          sx={{ padding: 1 }}
          ref={useOnScreen(
            (isVisible) => { if (isVisible) { updateProduct(i, products.length) } },
            "product_" + i
          )}
        >
          <h5 style={{ marginTop: 0, marginBottom: 1 }}>{product.name}</h5>
          <Typography color="text.secondary">
            <small>{product.description}</small>
          </Typography>
          <hr/>
        </Box>
      ))}
      <span id="scroll-view-bottom" />
    </div>
  );
}

function getViewTimeJSON(currentTime: Date) {
  let backgroundSec = Math.round(
    backgroundTime +
      (backgroundSince !== undefined
        ? Math.round((currentTime.getTime() - backgroundSince.getTime()) / 1000)
        : 0)
  );
  return {
    foreground:
      Math.round((currentTime.getTime() - loadedAt.getTime()) / 1000) -
      backgroundSec,
    background: backgroundSec,
  };
}

function getScreenSummaryJSON(currentTime: Date) {
  let backgroundSec = Math.round(
    backgroundTime +
      (backgroundSince !== undefined
        ? Math.round((currentTime.getTime() - backgroundSince.getTime()) / 1000)
        : 0)
  );
  return {
    foreground_sec:
      Math.round((currentTime.getTime() - loadedAt.getTime()) / 1000) -
      backgroundSec,
    background_sec: backgroundSec,
    ...screenSummary
  };
}

function ScreenSummaryJSON() {
  let [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const entity = getScreenSummaryJSON(currentTime);

  return (
    <div style={{ overflow: "auto" }}>
      <CopyBlock
        theme={dracula}
        language="json"
        text={`{
  // Time on the current screen while the app was in foreground
  "foreground_sec": ${entity.foreground_sec ?? 0},
  // Time on the current screen while the app was in background
  "background_sec": ${entity.background_sec ?? 0 },
  // Index of the last viewed item in the list on the screen
  "last_item_index": ${entity.last_item_index ?? 0},
  // Total number of items in the list on the screen
  "items_count": ${entity.items_count ?? 0},
  // Minimum vertical scroll offset on the scroll view in pixels
  "min_y_offset": ${entity.min_y_offset ?? 0},
  // Maximum vertical scroll offset on the scroll view in pixels
  "max_y_offset": ${entity.max_y_offset ?? 0},
  // Width of the content in the scroll view in pixels
  "content_width": ${entity.content_width ?? 0},
  // Height of the content in the scroll view in pixels
  "content_height": ${entity.content_height ?? 0}
}`}
      />
    </div>
  );
}

function getViewSegmentsJSON(currentTime: Date) {
  let result = segments.map((s) => {
    return {
      id: s.identifier,
      description: s.description,
      visible: Math.round(
        s.totalVisibleTime +
          (s.visibleSince !== undefined
            ? (currentTime.getTime() - s.visibleSince.getTime()) / 1000
            : 0)
      ),
      y_percent_reached: s.maxScrollDepthY,
    };
  });
  result.sort((a, b) => a.id > b.id ? 1 : -1);
  return result;
}

function AtomicTable() {
  let [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const screenSummary = getScreenSummaryJSON(currentTime);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>event_name</TableCell>
          <TableCell>dvce_created_tstamp</TableCell>
          <TableCell>
            contexts_..._screen
          </TableCell>
          <TableCell>
            contexts_..._screen_summary
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>screen_end</TableCell>
          <TableCell>{currentTime.toISOString()}</TableCell>
          <TableCell>{JSON.stringify([screenEntity], undefined, ' ')}</TableCell>
          <TableCell>{JSON.stringify([screenSummary], undefined, ' ')}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>screen_view</TableCell>
          <TableCell>{loadedAt.toISOString()}</TableCell>
          <TableCell>{JSON.stringify([screenEntity], undefined, ' ')}</TableCell>
          <TableCell>[]</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function ViewsTable() {
  let [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const screenSummary = getScreenSummaryJSON(currentTime);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>view_id</TableCell>
          <TableCell>engaged_time<br/>_in_s</TableCell>
          <TableCell>absolute_time<br/>_in_s</TableCell>
          <TableCell>vertical_pixels<br/>_scrolled</TableCell>
          <TableCell>vertical_percentage<br/>_scrolled</TableCell>
          <TableCell>last_list_item<br/>_index</TableCell>
          <TableCell>list_items<br/>_count</TableCell>
          <TableCell>list_items_percentage<br/>_scrolled</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{screenEntity.id}</TableCell>
          <TableCell>{screenSummary.foreground_sec}</TableCell>
          <TableCell>{(screenSummary.foreground_sec ?? 0) + (screenSummary.background_sec ?? 0)}</TableCell>
          <TableCell>{screenSummary.max_y_offset}</TableCell>
          <TableCell>{Math.round((screenSummary.max_y_offset ?? 0) / (screenSummary.content_height ?? 1) * 100)}</TableCell>
          <TableCell>{screenSummary.last_item_index}</TableCell>
          <TableCell>{screenSummary.items_count}</TableCell>
          <TableCell>{Math.round(((screenSummary.last_item_index ?? 0) + 1) / (screenSummary.items_count ?? 1) * 100)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function SessionsTable() {
  let [currentTime, setCurrentTime] = useState(new Date());

  let sessionIdentifier = "98c47c5e-d45d-47ba-a30b-b98d42e820db";
  let sessionOtherEngagedSec = 412;
  let sessionOtherAbsoluteSec = 935;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const screenSummary = getScreenSummaryJSON(currentTime);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>session_identifier</TableCell>
          <TableCell>engaged_time_in_s</TableCell>
          <TableCell>absolute_time_in_s</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{sessionIdentifier}</TableCell>
          <TableCell>{screenSummary.foreground_sec + sessionOtherEngagedSec}</TableCell>
          <TableCell>{(screenSummary.foreground_sec ?? 0) + (screenSummary.background_sec ?? 0) + sessionOtherAbsoluteSec}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function UsersTable() {
  let [currentTime, setCurrentTime] = useState(new Date());

  let userIdentifier = "b2476e05-172f-49a4-98a1-ef5e1dccf70d"
  let userOtherEngagedSec = 1342;
  let userOtherAbsoluteSec = 5398;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const screenSummary = getScreenSummaryJSON(currentTime);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>user_identifier</TableCell>
          <TableCell>engaged_time_in_s</TableCell>
          <TableCell>absolute_time_in_s</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{userIdentifier}</TableCell>
          <TableCell>{screenSummary.foreground_sec + userOtherEngagedSec}</TableCell>
          <TableCell>{(screenSummary.foreground_sec ?? 0) + (screenSummary.background_sec ?? 0) + userOtherAbsoluteSec}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function Description(props: any) {
  return (
    <Typography color="text.secondary">
      <p>{props.children}</p>
    </Typography>
  );
}

export default function Content() {
  const [background, setBackground] = useState(false);

  return (
    <Typography sx={{ mt: 6, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid md={12}>
          <h1>Snowplow Mobile Screen Engagement Tracking Demo</h1>
          <Description>
            This demo shows how the screen engagement tracking work on mobile apps using the Snowplow mobile trackers. It shows:
            <ol>
              <li>Data tracked from the app using <b>Snowplow iOS or Android trackers</b> (version 6.0.0+)</li>
              <li>Modeled tables created by the <b>Snowplow Unified dbt package</b> (version 0.2.0+)</li>
            </ol>
            To learn more, <a href="https://docs.snowplow.io/docs/collecting-data/collecting-from-own-applications/mobile-trackers/tracking-events/screen-tracking/#screen-engagemement-tracking">visit the documentation</a>.
          </Description>
        </Grid>
        <Grid md={5}>
          <h2>Mobile App</h2>
          <Description>
            Scroll down in the app to track viewed content metrics.
            Move the app to background to track background time.
          </Description>
          <PhoneView background={background} />
          <Button
            onClick={() => {
              if (background) {
                backgroundTime +=
                  (new Date().getTime() -
                    (backgroundSince ?? new Date()).getTime()) /
                  1000;
                backgroundSince = undefined;
              } else {
                backgroundSince = new Date();
              }
              setBackground(!background);
            }}
          >
            Move app to {background ? "foreground" : "background"}
          </Button>
        </Grid>

        <Grid xs={7}>
          <h2>Tracked data</h2>
          <Description>
            The screen engagement information is tracked using the <b>screen_summary</b> entity along background, foreground, and screen_end events.
          </Description>
          <h3>screen_summary entity</h3>
          <Description>
            Created by the trackers.
            Contains screen time and viewed content metrics.
          </Description>

          <ScreenSummaryJSON />
        </Grid>

        <Grid xs={12}>
          <h2>Data in the warehouse</h2>
          <Description>
            Below is the currently collected data (based on your single screen view) as they would appear in the warehouse.
          </Description>
          <h3>Atomic events table</h3>
          <Description>
            The screen_summary entity will show up in the atomic events table along with background/foreground/screen_end events.
          </Description>
          <AtomicTable />

          <h3>Views table (snowplow_unified_views)</h3>
          <Description>
            The information is then aggregated by the Snowplow Unified dbt package per each view.
          </Description>
          <ViewsTable />

          <h3>Sessions table (snowplow_unified_sessions)</h3>
          <Description>
            The sessions table aggregates the total screen time metrics per user session.
          </Description>
          <SessionsTable />

          <h3>Users table (snowplow_unified_users)</h3>
          <Description>
            The users table aggregates the total screen time metrics per user.
          </Description>
          <UsersTable />

        </Grid>
      </Grid>
    </Typography>
  );
}
