import { Model } from "../../bindings/tasks";
import dayjs, { Dayjs } from "dayjs";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { appWindow, UserAttentionType } from "@tauri-apps/api/window";

let permissionGranded = await isPermissionGranted();

if (!permissionGranded) {
  const permission = await requestPermission();
  permissionGranded = permission === "granted";
}

const isPlayAlarmTime = (time: string) => {
  console.log(time);
  return dayjs().format("HH:mm") === time;
};

// 通知を送る
// FIXME通知を送ったらコンポーネントの再レンダリングしたい
const notify = (el: Model) => {
  sendNotification({
    title: "セットしたタスクの時間です",
    body: `${el!.title}`,
  });
  appWindow.setSkipTaskbar(false);
  appWindow.requestUserAttention(UserAttentionType.Critical);
  //FIXME: ここでリロードするのは違う。他の方法がほしい
  window.location.reload();



};

const notifier = (e: Model[]) => {
  if (isPlayAlarmTime(e.at(-1)?.limit_time!)) {
    console.log("NOTIFICATION SEND");
    const el = e.pop();
    notify(el!);
  }
};

const resetTimer = (timerId: number, sorted: Model[]) => {
  if (timerId !== undefined) {
    clearInterval(timerId);
  }
  return setInterval(notifier, 5000, sorted);
};


const isToday = (notifyTime: Dayjs) => {
  const today = dayjs(); 
    return notifyTime.isSame(today, "day");
};


const shouldNotify = (e: Model) => {
  
  if (e.limit_time == null) return false;
  if (e.is_deleted === "Yes") return false;
  if (e.is_completed === "Yes") return false;
  
  const notifyTime = dayjs(e.limit_date + " " + e.limit_time);
  const now = dayjs();
  if (notifyTime.isBefore(now)) return false;
  return isToday(notifyTime);
};



let timerId: number;

export const setAlarm = (projects: Model[]) => {
  
  const filtered = projects.filter((obj) =>
    shouldNotify(obj)
  );

  if (filtered.length < 0) return;

  let sorted = filtered.sort((a, b) => {
    return dayjs(b.limit_date + b.limit_time!).diff(
      dayjs(a.limit_date + a.limit_time!)
    );
  });

  console.log(sorted);

  timerId = resetTimer(timerId, sorted);
};
