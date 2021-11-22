<template>
  <div class="container top-10">
    <input style="margin-right: 5px;" class="btn btn-primary right" type="submit" v-model="formState.connectButton" @click="onWalletConnect">
    <h1>Escrow Program Interface</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { walletConnect } from "./util/walletConnect";

interface WalletState {
    walletConnection: string;
    walletPublicKey: null | string;
}

interface FormState {
  connectButton: null | string
}

export default defineComponent({
  setup() {

    const formState: FormState = reactive({
      connectButton: "CONNECT WALLET",
    })

    const walletState: WalletState = reactive({
      walletConnection: "Disconnected",
      walletPublicKey: null,
    });

    const onWalletConnect = async () => {
      try {
        const { 
          walletConnection,
          walletPublicKey
        } = await walletConnect();
        walletState.walletConnection = walletConnection;
        walletState.walletPublicKey = walletPublicKey;
        formState.connectButton = walletConnection;
      } catch(err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("A message-less error occurred");
        }
      }
    }

    return {
      formState,
      onWalletConnect
    }
  }
})
</script>

