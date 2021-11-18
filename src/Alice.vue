<template>
  <div class="container mt-3 mt-sm-5">
    <div>
      <div class="form-group">
          <label for="2020-12-24-programId-escrow-alice">Throwaway private key (as byte array from sollet.io, without the '[]')</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.privateKey">
      </div>
      <div class="form-group">
          <label for="2020-12-24-programId-escrow-alice">Program id</label>
          <input class="form-control form-control-warning" type="text" id="2020-12-24-programId-escrow-alice" v-model="formState.programId">
      </div>
      <div class="form-group">
          <label for="">Alice's X token account pubkey</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.aliceXTokenAccountPubkey">
      </div>
      <div class="form-group">
          <label for="">Amount of X tokens to send to escrow</label>
          <input class="form-control form-control-warning" type="number" v-model="formState.amountXTokensToSendToEscrow">
      </div>
      <div class="form-group">
          <label for="">Alice's Y token account pubkey</label>
          <input class="form-control form-control-warning" type="text" v-model="formState.aliceYTokenAccountPubkey">
      </div>
      <div class="form-group">
          <label for="">Amount of Y tokens Alice wants</label>
          <input class="form-control form-control-warning" type="number" v-model="formState.amountYTokensAliceExpects">
      </div>
      <div class="form-group">
          <input style="margin-right: 5px;" class="btn btn-primary" type="submit" value="Reset UI" @click="resetAliceUI">
          <input class="btn btn-primary" type="submit" value="Init escrow" @click="onInitEscrow">
      </div>
    </div>
    <div>
      <div class="form-group">
        Escrow account:
        <div>{{ escrowState.escrowAccountPubkey ?? '--' }}</div>
      </div>
      <div class="form-group">
        Decoded State
      </div>
      <div class="form-group">
        Is initialized:
        <div>{{ escrowState.isInitialized ?? '--' }}</div>
      </div>
      <div class="form-group">
        Initializer account:
        <div>{{ escrowState.initializerAccountPubkey ?? '--' }}</div>
      </div>
      <div class="form-group">
        X token temp account:
        <div>{{ escrowState.XTokenTempAccountPubkey ?? '--' }}</div>
      </div>
      <div class="form-group">
        Initializer Y token account:
        <div>{{ escrowState.initializerYTokenAccount ?? '--' }}</div>
      </div>
      <div class="form-group">
        ExpectedAmount:
        <div>{{ escrowState.expectedAmount ?? '--' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { initEscrow } from "./util/initEscrow";

interface EscrowState {
    escrowAccountPubkey: null | string;
    isInitialized: null | boolean;
    initializerAccountPubkey: null | string;
    XTokenTempAccountPubkey: null | string;
    initializerYTokenAccount: null | string;
    expectedAmount: null | number;
}

export default defineComponent({
  setup() {
    const formState = reactive({
      privateKey: "182,26,65,29,158,59,199,28,44,65,213,221,96,113,46,168,248,14,69,75,133,179,35,44,218,52,215,242,255,198,90,26,82,146,227,191,68,11,97,154,164,84,65,121,4,20,107,99,140,183,54,192,145,169,34,211,224,236,72,152,96,198,9,229",
      programId: "EWteUw3TUuQniV6pA3c4YjJSo2x6JzMMSfgia7m9gm49",
      aliceXTokenAccountPubkey: "3D5BCoBgx1yZx3L28Ja82ae8wxGVABYorbqSeBrosMbR",
      aliceYTokenAccountPubkey: "GxvkCquftnvwYBgUqxNv4GtpYg8Q5QV2VtiuhNBQ3wjJ",
      amountXTokensToSendToEscrow: 0,
      amountYTokensAliceExpects: 0
    })

    const escrowState: EscrowState = reactive({
      escrowAccountPubkey: null,
      isInitialized: null,
      initializerAccountPubkey: null,
      XTokenTempAccountPubkey: null,
      initializerYTokenAccount: null,
      expectedAmount: null
    });

    const resetAliceUI = () => {
      formState.privateKey = "182,26,65,29,158,59,199,28,44,65,213,221,96,113,46,168,248,14,69,75,133,179,35,44,218,52,215,242,255,198,90,26,82,146,227,191,68,11,97,154,164,84,65,121,4,20,107,99,140,183,54,192,145,169,34,211,224,236,72,152,96,198,9,229";
      formState.programId = "EWteUw3TUuQniV6pA3c4YjJSo2x6JzMMSfgia7m9gm49";
      formState.aliceXTokenAccountPubkey = "3D5BCoBgx1yZx3L28Ja82ae8wxGVABYorbqSeBrosMbR";
      formState.aliceYTokenAccountPubkey = "GxvkCquftnvwYBgUqxNv4GtpYg8Q5QV2VtiuhNBQ3wjJ";
      formState.amountXTokensToSendToEscrow = 0;
      formState.amountYTokensAliceExpects = 0;
      Object.keys(escrowState).forEach(key => escrowState[key as keyof EscrowState] = null);
    }

    const onInitEscrow = async () => {
      try {
        const { 
          escrowAccountPubkey,
          isInitialized,
          initializerAccountPubkey,
          XTokenTempAccountPubkey,
          initializerYTokenAccount,
          expectedAmount
        } = await initEscrow(
          formState.privateKey,
          formState.aliceXTokenAccountPubkey,
          formState.amountXTokensToSendToEscrow,
          formState.aliceYTokenAccountPubkey,
          formState.amountYTokensAliceExpects,
          formState.programId
        );
        escrowState.escrowAccountPubkey = escrowAccountPubkey;
        escrowState.isInitialized = isInitialized;
        escrowState.initializerAccountPubkey = initializerAccountPubkey;
        escrowState.XTokenTempAccountPubkey = XTokenTempAccountPubkey;
        escrowState.initializerYTokenAccount = initializerYTokenAccount;
        escrowState.expectedAmount = expectedAmount;
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
      resetAliceUI,
      onInitEscrow,
      escrowState
    }
  }
})
</script>
