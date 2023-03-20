import { Model } from '../../bindings/tasks'
import dayjs, { Dayjs } from "dayjs";
import { isPermissionGranted, requestPermission, sendNotification} from '@tauri-apps/api/notification'
import { appWindow,UserAttentionType } from '@tauri-apps/api/window'

let permissionGranded = await isPermissionGranted();

if (!permissionGranded) {
    const permission = await requestPermission();
    permissionGranded = permission === 'granted';
}


const isPlayAlarmTime = (time:string) => {
    console.log(time);
   return dayjs().format('HH:mm') === time
}

const notify = (el:Model) => {
      sendNotification({ title: 'セットしたタスクの時間です', body: `${el!.title}`});
      const visible = appWindow.isVisible();
      if (!visible){
          appWindow.show().then();
      }
      //appWindow.minimize().then();  
      appWindow.requestUserAttention(UserAttentionType.Critical);
}

const notifier = (e:Model[]) => {
    if (isPlayAlarmTime(e.at(-1)?.limit_time!)){
        console.log("NOTIFICATION SEND");
        const el = e.pop();
        notify(el!);
   }
}

const resetTimer = (timerId:number,sorted:Model[]) => {
    if (timerId !== undefined) {
        clearInterval(timerId);
    }
    return setInterval(notifier,5000,sorted);
}

const isFuture = (date:string,time:string|null) => {
    if (time == null) return false

    const targetTime = dayjs(date + time);
    const now = dayjs();

    console.log(now);

    return targetTime.isAfter(now);
}


let timerId:number;

export const setAlarm = (projects:Model[]) => {

    const filtered = projects
    .filter(obj => 
        isFuture(obj.limit_date!,obj.limit_time));

    if (filtered.length < 0) return;

    let sorted = filtered.sort((a,b) => {
     return dayjs(b.limit_date + b.limit_time!).diff(dayjs(a.limit_date + a.limit_time!)); 
    });

    console.log(sorted);

    timerId = resetTimer(timerId,sorted);
    
}
