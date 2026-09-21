import { useRef } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/theme';

type SpeedSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function SpeedSlider({
  value,
  onChange,
  min = 100,
  max = 1000,
  step = 50,
}: SpeedSliderProps) {
  const width = useRef(1);
  const ratio = (value - min) / (max - min);

  function setFromX(x: number) {
    const t = Math.max(0, Math.min(1, x / width.current));
    const raw = min + t * (max - min);
    const snapped = Math.round(raw / step) * step;
    onChange(Math.min(max, Math.max(min, snapped)));
  }

  // Calculate real-world download estimates
  const movieSeconds = Math.max(8, Math.round(5000 / value));
  const gameMinutes = Math.max(1, Math.round((50000 / (value * 0.125)) / 60));

  return (
    <View className="gap-3">
      {/* Slider Interactive Track */}
      <View
        className="h-8 justify-center cursor-pointer"
        onLayout={(event) => {
          width.current = event.nativeEvent.layout.width;
        }}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={(event) => setFromX(event.nativeEvent.locationX)}
        onResponderMove={(event) => setFromX(event.nativeEvent.locationX)}
      >
        <View className="h-2 overflow-hidden rounded-full bg-slate-200">
          <View
            className="h-full rounded-full bg-slate-800"
            style={{ width: `${ratio * 100}%` }}
          />
        </View>
        <View
          className="absolute h-5 w-5 rounded-full border-2 border-white bg-slate-900 shadow-sm"
          style={{ left: `${ratio * 100}%`, marginLeft: -10, top: 6 }}
        />
      </View>

      {/* Min / Max Labels */}
      <View className="flex-row justify-between">
        <Text className="text-xs font-normal text-slate-500">{min} Mbps</Text>
        <Text className="text-xs font-normal text-slate-500">{max} Mbps</Text>
      </View>

      {/* Dynamic Real-world Benchmark Pill Strip */}
      <View className="flex-row flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
        <View className="flex-row items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
          <Ionicons name="film-outline" size={13} color="#475569" />
          <Text className="text-xs font-normal text-slate-600">
            4K филм: ~{movieSeconds} сек
          </Text>
        </View>
        <View className="flex-row items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
          <Ionicons name="game-controller-outline" size={13} color="#475569" />
          <Text className="text-xs font-normal text-slate-600">
            50GB игра: ~{gameMinutes} мин
          </Text>
        </View>
        <View className="flex-row items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1">
          <Ionicons name="wifi" size={13} color="#475569" />
          <Text className="text-xs font-normal text-slate-600">
            Wi-Fi 6 без лаг
          </Text>
        </View>
      </View>
    </View>
  );
}

