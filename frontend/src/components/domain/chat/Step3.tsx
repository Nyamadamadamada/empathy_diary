import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Network, Position } from 'vis-network';
import { DataSet } from 'vis-data';
import {
  initialData,
  happyGraph,
  sadGraph,
  surprisedGraph,
  disgustedGraph,
  interestGraph,
  loveGraph,
  fearGraph,
  neutralGraph,
  angryGraph,
  idLabelMap,
  emotionGraphMap,
  getEmotionGraphData,
} from '~/config/emotion';
import TextWatchButton from '~/components/share/TextWatchButton';
import { STEP_TYPE, STEP } from '~/types/step';

type Prop = {
  selectedEvent: string;
  handleSelectEmotion: (selectedEmotionTitle: string) => void;
  handleReturnStep: (step: STEP_TYPE) => void;
};

export default function Step3({ selectedEvent, handleSelectEmotion, handleReturnStep }: Prop) {
  const predictedEmotion = '信頼';
  const [selectEmotion, setSelectEmotion] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);
  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    let network: Network | null = null;
    let defaultGraph;

    if (ref.current) {
      const baseEdges = new DataSet([...initialData.edges]);
      const baseNodes = new DataSet([
        {
          id: 'rootNode',
          shape: 'dot',
          borderWidth: 1,
          color: { background: 'white', border: '#9ca3af', highlight: { background: 'white', border: '#9ca3af' } },
        },
        ...initialData.nodes,
      ]);

      const options = {
        physics: { barnesHut: { gravitationalConstant: -3000 } },
        interaction: { multiselect: false },
      };

      network = new Network(ref.current, { nodes: baseNodes, edges: baseEdges }, options);

      // ズーム制限
      // https://stackoverflow.com/questions/49299774/how-to-limit-zooming-of-a-vis-js-network
      let lastPosition: Position | undefined;
      const maxZoom = 2;
      const minZoom = 0.5;
      network.on('zoom', function (params) {
        if (params.scale < minZoom || params.scale > maxZoom) {
          // adjust this value according to your requirement
          network?.moveTo({
            position: lastPosition, // use the last position before zoom limit
            scale: params.scale > maxZoom ? maxZoom : minZoom, // this scale prevents zooming out beyond the desired limit
          });
        } else {
          // store the current position as the last position before zoom limit
          lastPosition = network?.getViewPosition();
        }
      });
      // on pan, store the current position
      network.on('dragEnd', function () {
        lastPosition = network?.getViewPosition();
      });

      let currentSecondLayerNodeIds: string[] = [];
      let currentFirstLayerNodeId: string | null = null;

      // 初期表示時のデフォルト値
      network.once('afterDrawing', function () {
        // TODO: nodeIDをpropsから取得useEffectの初期値に入れるようにね
        defaultGraph = getEmotionGraphData('LOVE_1');
        if (!defaultGraph) return;
        baseNodes.add(defaultGraph.nodes);
        baseEdges.add(defaultGraph.edges);
        network?.selectNodes(['LOVE_1']);
        currentSecondLayerNodeIds = defaultGraph.nodes.map((node: any) => node.id);
      });

      // ノード選択時のイベント(二層目を表示し、他の二層目を非表示にする)
      network.on('click', (params: { nodes: string[] }) => {
        if (params.nodes.length === 0) return;
        const clickedNodeId = params.nodes[0];
        const clickLabel = idLabelMap[clickedNodeId] ?? '';
        setSelectEmotion(clickLabel);
        if (clickedNodeId === currentFirstLayerNodeId) return;

        const graph = emotionGraphMap[clickedNodeId];
        if (!graph) return;

        currentFirstLayerNodeId = clickedNodeId;

        if (currentSecondLayerNodeIds.length > 0) {
          baseNodes.remove(currentSecondLayerNodeIds);
          const edgeIdsToRemove = baseEdges
            .get()
            .filter((edge: any) => currentSecondLayerNodeIds.includes(edge.to))
            .map((edge: any) => edge.id || `${edge.from}->${edge.to}`);
          baseEdges.remove(edgeIdsToRemove);
        }

        baseNodes.add(graph.nodes);
        baseEdges.add(graph.edges);
        currentSecondLayerNodeIds = graph.nodes.map((node: any) => node.id);
      });
    }

    // クリーンアップ
    return () => {
      network?.destroy();
      network = null;
    };
  }, []);

  return (
    <div className="mb-40 flex flex-col justify-center px-0 sm:px-4 sm:m-4">
      <div className="max-w-full sm:max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 w-full">
        {/* モフのセリフ */}
        <div className="flex flex-col sm:flex-row items-start sm:space-x-8 space-y-4 sm:space-y-8 w-full animate-fade-fast opacity-0 delay-200">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 overflow-hidden rounded-full relative flex-shrink-0">
              <img
                src="/img/mofu/mofu_nomal.png"
                alt="キャラアイコン"
                className="w-full h-full object-cover transform scale-125 translate-y-3"
              />
            </div>
            <div className="zenMaru-bold text-center text-yellow-600 text-sm mt-1">モフ</div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="zenMaru-regular text-xl leading-[1.8]">
              「<span className="marker font-bold">{selectedEvent}</span>」ことがあったんだね。
              <br />
              その時どんな気持ちになったのかな？
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 justify-center w-full">
          <div className="mt-2 mb-2 text-sm text-gray-600">
            推測される感情: <span className="font-bold">{predictedEmotion}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              className="w-full sm:w-36 text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 resize-none"
              type="text"
              value={selectEmotion}
              onChange={(e) => setSelectEmotion(e.target.value)}
              placeholder="選択 or 自由記入"
            />
            <TextWatchButton
              originalText=""
              label="決定"
              currentText={selectEmotion}
              onClick={() => handleSelectEmotion(selectEmotion)}
            />
          </div>
        </div>

        <div className="w-full shadow-xl border border-gray-300 bg-white rounded-lg p-4 animate-fade-fast opacity-0 delay-700">
          <div style={{ height: '60vh', width: '100%' }} ref={ref} />
        </div>
      </div>
    </div>
  );
}
