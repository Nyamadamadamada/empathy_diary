import { useEffect, useRef, useState } from 'react';
import { Network, Position } from 'vis-network';
import { DataSet } from 'vis-data';
import { initialData, idLabelMap, emotionGraphMap, getEmotionGraphData, isEmotion } from '~/config/emotion';
import TextWatchButton from '~/components/share/TextWatchButton';
import { EmotionNode } from '~/api/fetchEmotion';

type Prop = {
  isLoading: boolean;
  selectedEvent: string;
  emotion: string;
  predictedEmotion: EmotionNode | null;
  setEmotion: React.Dispatch<React.SetStateAction<string>>;
  handleSelectEmotion: () => void;
};

export default function Step3({
  isLoading,
  selectedEvent,
  emotion,
  predictedEmotion,
  setEmotion,
  handleSelectEmotion,
}: Prop) {
  const ref = useRef<HTMLDivElement>(null);
  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    let network: Network | null = null;
    let secondGraph;

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
        if (!predictedEmotion) return;
        // 初期値が１層目の場合
        if (isEmotion(predictedEmotion.id)) {
          console.log('１層目');
          network?.selectNodes([predictedEmotion.id]);
          return;
        }
        // 初期値が２層目の感情の場合、2層目のグラフを取得する
        secondGraph = getEmotionGraphData(predictedEmotion.id);
        if (!secondGraph) return;

        baseNodes.add(secondGraph.nodes);
        baseEdges.add(secondGraph.edges);
        network?.selectNodes([predictedEmotion.id]);
        currentSecondLayerNodeIds = secondGraph.nodes.map((node: any) => node.id);
      });

      // ノード選択時のイベント(二層目を表示し、他の二層目を非表示にする)
      network.on('click', (params: { nodes: string[] }) => {
        if (params.nodes.length === 0) return;
        const clickedNodeId = params.nodes[0];
        const clickLabel = idLabelMap[clickedNodeId] ?? '';
        setEmotion(clickLabel);
        if (clickedNodeId === currentFirstLayerNodeId) return;
        // １層目をクリックしたのなら、二層目を表示する
        const graph = emotionGraphMap[clickedNodeId];
        if (!graph) return;

        currentFirstLayerNodeId = clickedNodeId;
        // 他の二層目を取り除く
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
    <div className={`mb-40 flex flex-col justify-center px-0 sm:px-4 sm:m-4 ${isLoading ? 'pointer-events-none' : ''}`}>
      <div className="max-w-full relative sm:max-w-4xl mx-auto  sm:p-6 space-y-6 sm:space-y-8 w-full wrap-break-word">
        {isLoading && (
          <div className="absolute  inset-0 bg-white bg-opacity-60 flex  flex-col items-center justify-center z-50 rounded-lg">
            {/* ローディングオーバーレイ */}
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600 z-50"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="mt-2 font-bold p-1">文章を作成しています...</span>
          </div>
        )}
        {/* モフのセリフ */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 w-full animate-fade-fast opacity-0 delay-200">
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

          <div className="flex flex-col justify-center mt-2">
            {selectedEvent ? (
              <p className="zenMaru-regular text-xl  leading-[1.8]">
                「<span className="marker font-bold wrap-break-word">{selectedEvent}</span>」ことがあったんだね。
                <br />
                その時どんな気持ちになったのかな？
              </p>
            ) : (
              <p className="zenMaru-regular text-xl leading-[1.8]">今日はどんな気持ちかな？</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 justify-center w-full">
          {predictedEmotion && (
            <div className="mt-2 mb-2 text-sm text-gray-600">
              推測される感情: <span className="font-bold">{predictedEmotion.emotion}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              className="w-full sm:w-36 text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 resize-none"
              type="text"
              value={emotion}
              maxLength={50}
              onChange={(e) => setEmotion(e.target.value)}
              placeholder="選択 or 自由記入"
            />
            <TextWatchButton originalText="" label="決定" currentText={emotion} onClick={() => handleSelectEmotion()} />
          </div>
        </div>

        <div className="w-full shadow-xl border border-gray-300 bg-white rounded-lg p-4 animate-fade-fast opacity-0 delay-700">
          <div style={{ height: '60vh', width: '100%' }} ref={ref} />
        </div>
      </div>
    </div>
  );
}
