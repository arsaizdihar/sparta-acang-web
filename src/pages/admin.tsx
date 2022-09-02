import { FeatureFlag } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '~/components/Button';
import CustomHead from '~/components/CustomHead';
import Modal from '~/components/Modal';
import Title from '~/components/Title';
import { trpc } from '~/utils/trpc';
import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      session,
    },
  };
};

const Admin = () => {
  const fflagQuery = trpc.useQuery(['admin.getFeatureFlags']);
  return (
    <>
      <CustomHead title="Admin page" />
      <Title text="Feature Flags" />
      <div className="max-w-screen-sm mx-auto linear-gradient-card-1 p-2 flex flex-col gap-2">
        {fflagQuery.data?.map((fflag) => (
          <FeatureToggle {...fflag} key={fflag.name} />
        ))}
      </div>
      <Title text="Votes Count" />
      <div className="max-w-screen-sm mx-auto linear-gradient-card-1 p-2 flex flex-col gap-2 mb-12">
        <VotesCount />
      </div>
    </>
  );
};

function FeatureToggle(props: FeatureFlag) {
  const toggleMutation = trpc.useMutation('admin.toggleFeature');
  const [isChanging, setIsChanging] = useState(false);
  const queryClient = trpc.useContext();
  return (
    <>
      {isChanging && (
        <div
          className={`fixed z-10 top-0 bottom-0 left-0 right-0 bg-rgba flex items-center justify-center bg-black/30`}
          onClick={() => setIsChanging(false)}
        >
          <Modal
            text={`Yakin ingin ${props.value ? 'disable' : 'enable'} fitur ${
              props.name
            }?`}
            buttonText="Ya"
            runOnButtonClick={() => {
              const promise = toggleMutation.mutateAsync({
                name: props.name as any,
              });
              toast.promise(promise, {
                error: 'Gagal mengubah status',
                loading: 'Loading...',
                success: 'Berhasil mengubah status',
              });
              promise.then(() => {
                setIsChanging(false);
                const data = queryClient.getQueryData([
                  'admin.getFeatureFlags',
                ]);
                if (data) {
                  queryClient.setQueryData(
                    ['admin.getFeatureFlags'],
                    data.map((fflag) =>
                      fflag.name === props.name
                        ? { ...fflag, value: !fflag.value }
                        : fflag,
                    ),
                  );
                }
              });
            }}
            runToClose={() => setIsChanging(false)}
          />
        </div>
      )}
      <label
        htmlFor={props.name.toLowerCase()}
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            id={props.name.toLowerCase()}
            checked={props.value}
            onChange={() => {
              setIsChanging(true);
            }}
            type="checkbox"
            className="sr-only"
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">{props.name}</div>
      </label>
    </>
  );
}

function VotesCount() {
  const vCountQuery = trpc.useQuery(['admin.exVoteCount'], {
    staleTime: 120000,
  });
  if (!vCountQuery.data) return null;
  return (
    <>
      <Button
        text="refresh"
        runOnClick={() => {
          const promise = vCountQuery.refetch();
          toast.promise(promise, {
            error: 'Gagal refresh',
            loading: 'Refreshing...',
            success: 'Berhasil refresh',
          });
        }}
      />
      <ul>
        {vCountQuery.data.map((m) => (
          <li key={m.id}>
            {m.id} - {m._count.votes}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Admin;
