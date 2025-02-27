import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();
  const refresh = () => window.location.reload();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title") as string;
    const occurs_at = data.get("occurs-at") as string;
    if (!title || !occurs_at) return;

    await api
      .post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      })
      .then(() => {
        refresh();
      });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400 ">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-6" />
            <input
              type="text"
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"
            />
          </div>
          <div className=" flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-6" />
              <input
                type="datetime-local"
                name="occurs-at"
                placeholder="Data e horário da atividade"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1 [color-scheme:dark]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}
